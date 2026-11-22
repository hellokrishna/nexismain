export function OgCard({
  kicker,
  title,
  footer,
}: {
  kicker: string;
  title: string;
  footer: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0c0e0b",
        color: "#f4f1e8",
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#d6f25c" }}>{kicker}</div>
      <div
        style={{
          display: "flex",
          fontSize: 68,
          lineHeight: 1.05,
          fontWeight: 700,
          letterSpacing: -1,
          maxWidth: 980,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#c5cdc0" }}>{footer}</div>
    </div>
  );
}
