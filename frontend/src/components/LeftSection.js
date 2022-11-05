import { Button } from "@mui/material";
import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import { Link, useLocation } from "react-router-dom";

export default function LeftSection() {
  const { theme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  return (
    <div style={{ ...styles.content, backgroundColor: theme.backgroundColor }}>
      <Button
        sx={{
          ...styles.button,
          backgroundColor: pathname === "/" ? "#333333" : "transparent",
        }}
        startIcon={
          <div style={styles.buttonIconContainer}>
            <AddRoundedIcon sx={{ fontSize: "2rem" }} />
          </div>
        }
        component={Link}
        to="/"
      >
        Add Guardian
      </Button>

      <Button
        sx={{
          ...styles.button,
          backgroundColor: pathname === "/recover" ? "#333333" : "transparent",
        }}
        startIcon={
          <div style={styles.buttonIconContainer}>
            <HistoryRoundedIcon sx={{ fontSize: "2rem" }} />
          </div>
        }
        component={Link}
        to="/recover"
      >
        Recover PR
      </Button>

      <Button
        sx={{
          ...styles.button,
          backgroundColor:
            pathname === "/cancelRecovery" ? "#333333" : "transparent",
        }}
        startIcon={
          <div style={styles.buttonIconContainer}>
            <CloseRoundedIcon sx={{ fontSize: "2rem" }} />
          </div>
        }
        component={Link}
        to="/cancelRecovery"
      >
        Cancel Recovery
      </Button>

      <Button
        sx={{
          ...styles.button,
          backgroundColor:
            pathname === "/rotateKey" ? "#333333" : "transparent",
        }}
        startIcon={
          <div style={styles.buttonIconContainer}>
            <RotateLeftRoundedIcon sx={{ fontSize: "2rem" }} />
          </div>
        }
        component={Link}
        to="/rotateKey"
      >
        Rotate Key
      </Button>
    </div>
  );
}

const styles = {
  content: {
    minWidth: 300,
    width: "100%",

    maxWidth: 300,
    flex: 1,
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "flex-end",

    gap: 20,
  },
  button: {
    textTransform: "none",
    height: 75,
    fontSize: "1.5rem",

    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "flex-start",

    color: "#d0d0d0",
    width: "100%",

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    "&:hover": {
      backgroundColor: "#333333",
    },
  },
  buttonIconContainer: {
    backgroundColor: "rgba(256,256,256,.1)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",

    marginRight: 10,
  },
};
