export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      padding: "40px"
    }}>
      <h1 style={{ fontSize: "50px" }}>FounderAI</h1>

      <p style={{ maxWidth: "600px", fontSize: "18px", opacity: 0.8 }}>
        Turn any idea into a complete business using AI.
      </p>

      <a
        href="/dashboard"
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#7c3aed",
          borderRadius: "10px",
          color: "white",
          textDecoration: "none"
        }}
      >
        Start Building
      </a>
    </main>
  );
}
