import { Button } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CancelRecoveryPage() {
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
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: theme.backgroundColor,
            padding: 20,
            minHeight: 200,
            width: "100%",
            maxWidth: 350,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h1 style={{ color: theme.textColor }}>Cancel Recovery</h1>

            <p style={{ color: theme.textColor3 }}>
              Nulla laboris mollit elit esse velit laborum enim nulla incididunt
              magna officia.
            </p>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            <Button
              sx={{
                color: theme.textColor3,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.2rem",
                height: 40,
                backgroundColor: "#222222",
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                color: theme.textColor,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.2rem",
                height: 40,
                backgroundColor: "#484848",
              }}
            >
              Execute
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
