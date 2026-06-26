"use client";

import { useState } from "react";

export default function Dashboard() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ idea }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>AI Business Generator</h1>

      <textarea
        style={{ width: "100%", height: "120px", marginTop: "20px" }}
        placeholder="Example: I want to start a mobile detailing business"
        onChange={(e) => setIdea(e.target.value)}
      />

      <button
        onClick={generate}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "black",
          color: "white",
        }}
      >
        {loading ? "Generating..." : "Generate Business"}
      </button>

      <pre style={{ marginTop: "20px" }}>{result}</pre>
    </main>
  );
}
