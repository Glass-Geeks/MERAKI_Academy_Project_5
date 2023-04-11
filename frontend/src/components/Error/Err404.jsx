import React from "react";

const Error404 = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "15rem",
            fontWeight: "900",
            marginBottom: "0",
          }}
        >
          404
        </h1>
        <h3 style={{ fontSize: "3rem", marginTop: "0.5rem" }}>
          Oops! Page not found
        </h3>
        <p style={{ fontSize: "1.5rem", margin: "2rem 0" }}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a
          href="/"
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "all 0.2s",
          }}
        >
          Go back to homepage
        </a>
      </div>
    </div>
  );
};

export default Error404;
