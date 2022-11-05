import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function RotateKeyPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: 20,
        backgroundColor: theme.ui,
        width: "100%",
      }}
    >
      <div
        style={{
          paddingTop: 20,
          height: 700,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
        }}
      >
        <h1>Rotate Key</h1>
      </div>
    </div>
  );
}
