"use client";

import { useState } from "react";

export default function Dashboard() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    try {
      setLoading(true);
      setError("");
      setResult("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) {
        throw new Error("API failed with status " + res.status);
      }

      const data = await res.json();

      setResult(data.result || "No result returned");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>AI Business Generator</h1>

      <textarea
        style={{ width: "100%", height: "120px", marginTop: "20px" }}
        placeholder="Enter your business idea..."
        onChange={(e) => setIdea(e.target.value)}
      />

      <button
        onClick={generate}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
        }}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Error: {error}
        </p>
      )}

      <pre style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </main>
  );
}
