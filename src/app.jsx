import React, { useState, useRef, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Circle-to-edit (Samsung-style)
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [circle, setCircle] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  const generateImage = async () => {
    if (!user) {
      alert("Please sign in first");
      return;
    }

    setLoading(true);
    const token = await getIdToken(user);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  };

  const startDraw = (e) => {
    drawing.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    setCircle({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      r: 0
    });
  };

  const draw = (e) => {
    if (!drawing.current || !circle) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const r = Math.hypot(x - circle.x, y - circle.y);
    setCircle({ ...circle, r });
  };

  const applyEdit = async () => {
    const token = await getIdToken(user);

    const res = await fetch("/api/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ editPrompt, circle })
    });

    const data = await res.json();
    setImage(data.image);
    setCircle(null);
    setEditPrompt("");
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#020617", color: "white" }}>
      <aside style={{ width: 320, padding: 20 }}>
        <h2>✨ VisionForge</h2>

        <textarea
          placeholder="Describe your idea..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: "100%", height: 90 }}
        />

        <button onClick={generateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </aside>

      <main style={{ flex: 1, position: "relative" }}>
        {!image && <p style={{ opacity: 0.5 }}>Enter a prompt to generate an image</p>}

        {image && (
          <>
            <img src={image} style={{ maxWidth: "100%", maxHeight: "100%" }} />
            <canvas
              ref={canvasRef}
              width={1024}
              height={1024}
              style={{ position: "absolute", inset: 0 }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={() => (drawing.current = false)}
            />
          </>
        )}

        {circle && (
          <div style={{ position: "absolute", bottom: 20, left: 20 }}>
            <input
              placeholder="Change this area..."
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
            />
            <button onClick={applyEdit}>Apply AI Edit</button>
          </div>
        )}
      </main>
    </div>
  );
}
