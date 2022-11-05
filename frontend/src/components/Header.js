import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme } = useContext(ThemeContext);
  const { wallet } = useContext(AuthContext);
  const [accountId, setAccountId] = useState("");
  const [isSignedIn, setIsSignIn] = useState(false);

  useEffect(() => {
    async function startUp() {
      const isSignedIn = await wallet.startUp();
      setIsSignIn(isSignedIn);
      setAccountId(wallet.accountId);
    }
    startUp();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: 75,
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: 20,
      }}
    >
      <img
        height={50}
        src="https://www.pngall.com/wp-content/uploads/10/NEAR-Protocol-Crypto-Logo-PNG.png"
        alt="logo"
      />

      <div>
        <Button
          sx={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            fontSize: "1.3rem",
            textTransform: "none",
            paddingInline: 25,
            height: 50,
            "&:hover": {
              backgroundColor: "#161918",
            },
          }}
          onClick={async () => {
            if (!isSignedIn) {
              await wallet.signIn();
              setAccountId(wallet.accountId);
            } else {
              await wallet.signOut();
            }
          }}
        >
          {isSignedIn ? accountId : "Connet"}
        </Button>
      </div>
    </div>
  );
}
