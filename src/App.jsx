import React, { useState } from "react";
import UI from "./UI";

export default function App() {
  const [mode, setMode] = useState("creative");
  const [prompt, setPrompt] = useState("");
  const [characterTheme, setCharacterTheme] = useState("None");
  const [designType, setDesignType] = useState("Scene");
  const [paperSize, setPaperSize] = useState("A4");
  const [examMode, setExamMode] = useState(false);
  const [colorable, setColorable] = useState(false);

  const handleGenerate = () => {
    const finalPrompt = `
      ${prompt}
      Style: ${characterTheme}
      Type: ${designType}
      Paper: ${paperSize}
      ${examMode ? "Exam ready, clean" : ""}
      ${colorable ? "Black and white line art" : ""}
    `;
    console.log("FINAL PROMPT:", finalPrompt);
    alert("Prompt sent! Check console.");
  };

  return (
    <UI
      mode={mode}
      setMode={setMode}
      prompt={prompt}
      setPrompt={setPrompt}
      characterTheme={characterTheme}
      setCharacterTheme={setCharacterTheme}
      designType={designType}
      setDesignType={setDesignType}
      paperSize={paperSize}
      setPaperSize={setPaperSize}
      examMode={examMode}
      setExamMode={setExamMode}
      colorable={colorable}
      setColorable={setColorable}
      onGenerate={handleGenerate}
    />
  );
}
