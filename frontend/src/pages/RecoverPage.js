import { Button, InputBase } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function RecoverPage() {
  const { theme } = useContext(ThemeContext);

  const [owner, setOwner] = useState();

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
          paddingBlock: 20,
          height: 700,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
          width: "100%",
        }}
      >
        <div>
          <h1>Recover PR</h1>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
          >
            <InputBase
              sx={{
                // borderRadius: 5,
                border: "1px rgba(256,256,256,.25) solid",
                backgroundColor: theme.backgroundColor + "bf",
                color: "#FFF",
                height: 40,
                paddingInline: 15,
                fontSize: 16,
                width: "100%",
                maxWidth: 350,
              }}
              placeholder="New Owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              autoFocus
            />

            <Button
              sx={{
                // borderRadius: 5,
                textTransform: "none",
                height: 40,
                backgroundColor: "#333333",
                color: "#d0d0d0",
                fontSize: "1.2rem",
              }}
            >
              Invite
            </Button>
          </div>
        </div>

        <div>
          <p style={{ color: theme.textColor3 }}>
            Laborum duis irure Lorem pariatur dolore fugiat exercitation
            adipisicing adipisicing.
          </p>
        </div>
      </div>
    </div>
  );
}
