import React from "react";

export default function UI({
  mode,
  setMode,
  prompt,
  setPrompt,
  characterTheme,
  setCharacterTheme,
  designType,
  setDesignType,
  paperSize,
  setPaperSize,
  examMode,
  setExamMode,
  colorable,
  setColorable,
  onGenerate
}) {
  return (
    <div style={styles.container}>
      {/* LEFT PANEL */}
      <div style={styles.left}>
        <h2 style={styles.logo}>✨ VisionForge</h2>

        {/* MODE */}
        <div style={styles.section}>
          <button
            style={mode === "creative" ? styles.activeBtn : styles.btn}
            onClick={() => setMode("creative")}
          >
            Creative
          </button>
          <button
            style={mode === "school" ? styles.activeBtn : styles.btn}
            onClick={() => setMode("school")}
          >
            School
          </button>
        </div>

        {/* PROMPT */}
        <div style={styles.section}>
          <label>Describe your idea</label>
          <textarea
            style={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Cyberpunk ninja, neon lights..."
          />
        </div>

        {/* CHARACTER THEME */}
        <div style={styles.section}>
          <label>Character Theme</label>
          {["None", "Goku", "Naruto", "Pikachu"].map((c) => (
            <button
              key={c}
              style={characterTheme === c ? styles.activeBtn : styles.btn}
              onClick={() => setCharacterTheme(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* DESIGN TYPE */}
        <div style={styles.section}>
          <label>Design Type</label>
          {["Scene", "Character", "Item"].map((d) => (
            <button
              key={d}
              style={designType === d ? styles.activeBtn : styles.btn}
              onClick={() => setDesignType(d)}
            >
              {d}
            </button>
          ))}
        </div>

        {/* PAPER */}
        <div style={styles.section}>
          <label>Paper Size</label>
          {["A4", "Square", "Poster"].map((p) => (
            <button
              key={p}
              style={paperSize === p ? styles.activeBtn : styles.btn}
              onClick={() => setPaperSize(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {/* OPTIONS */}
        <div style={styles.section}>
          <label>
            <input
              type="checkbox"
              checked={examMode}
              onChange={() => setExamMode(!examMode)}
            />{" "}
            Exam Mode
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={colorable}
              onChange={() => setColorable(!colorable)}
            />{" "}
            Colorable (Line Art)
          </label>
        </div>

        <button style={styles.generate} onClick={onGenerate}>
          ⚡ Generate
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.right}>
        <p style={{ opacity: 0.6 }}>
          Generated image will appear here
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", background: "#0b1220", color: "white" },
  left: { width: 320, padding: 20, background: "#0f172a" },
  right: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center" },
  logo: { marginBottom: 20 },
  section: { marginBottom: 15 },
  btn: {
    display: "block",
    width: "100%",
    marginTop: 5,
    padding: 8,
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  activeBtn: {
    display: "block",
    width: "100%",
    marginTop: 5,
    padding: 8,
    background: "#14b8a6",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  textarea: {
    width: "100%",
    height: 70,
    padding: 8,
    background: "#020617",
    color: "white",
    borderRadius: 6,
    border: "1px solid #334155"
  },
  generate: {
    width: "100%",
    padding: 12,
    background: "#14b8a6",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer"
  }
};
