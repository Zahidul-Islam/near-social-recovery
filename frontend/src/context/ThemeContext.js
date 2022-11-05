import { useState, createContext } from "react";
import { createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [showAppDrawer, SetShowAppDrawer] = useState(false);

  const [enableDarkMode, setEnableDarkMode] = useState(true);

  const light = {};

  const dark = {
    textColor: "#ececec",
    textColor2: "#c0c0c0",
    textColor3: "#d0d0d0",

    buttonColor: "#fd8041",
    buttonTextColor: "#FFF",

    ui: "#222831",
    backgroundColor: "#111410",
    backgroundColor2: "#000000",
  };

  return (
    <ThemeContext.Provider
      value={{
        showAppDrawer,
        setShowAppDrawer: () => SetShowAppDrawer((e) => !e),

        light,
        dark,
        toggleDarkMode: () => setEnableDarkMode((e) => !e),
        theme: enableDarkMode ? dark : light,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: "#fd8041",
    },
    secondary: {
      main: "#FFB836",
    },
    tertiary: {
      main: "#56CDAD",
    },
    error: {
      main: "#D63649",
    },
    background: {
      default: "#FFF",
    },
    success: {
      main: "#26A4FF",
    },
    info: {
      main: "#4640DE",
    },
  },

  typography: {
    fontFamily: [
      "Nunito",
      "sans-serif",
      "Roboto",
      "Epilogue",
      '"Helvetica Neue"',
      "Arial",
    ].join(","),

    h1: {
      fontSize: 72,
      fontWeight: 700,
      color: "#25324b",
    },
    h2: {
      fontSize: 48,
      fontWeight: 700,
      color: "#25324b",
    },
    h3: {
      fontSize: 32,
      fontWeight: 700,
      color: "#25324b",
    },
    h4: {
      fontSize: 24,
      fontWeight: 700,
      color: "#25324b",
    },
    h5: {
      fontSize: 20,
      fontWeight: 700,
      color: "#25324b",
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
      color: "#25324b",
    },

    body_Xlarge: {
      fontSize: 20,
      fontWeight: 400,
      color: "#25324b",
    },
    body_large_700: {
      fontSize: 18,
      fontWeight: 700,
      color: "#25324b",
    },
    body_large_600: {
      fontSize: 18,
      fontWeight: 600,
      color: "#25324b",
      textAlign: "left",
    },
    body_large_500: {
      fontSize: 18,
      fontWeight: 500,
      color: "#25324b",
    },
    body_large_400: {
      fontSize: 18,
      lineHeight: 1.5,
      fontWeight: 400,
      color: "#25324b",
      textAlign: "left",
    },

    body_normal_700: {
      fontSize: 16,
      fontWeight: 700,
      color: "#25324b",
    },
    body_normal_600: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 600,
      color: "#25324b",
    },
    body_normal_500: {
      fontSize: 16,
      fontWeight: 500,
      color: "#25324b",
    },
    body_normal_400: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 400,
      color: "#25324b",
      align: "left",
    },

    body_small_600: {
      fontSize: 14,
      fontWeight: 600,
      color: "#25324b",
    },
    body_small_500: {
      fontSize: 14,
      fontWeight: 500,
      color: "#25324b",
    },
    body_small_400: {
      fontSize: 14,
      lineHeight: 1.5,
      fontWeight: 400,
      color: "#25324b",
    },

    // Buttons
    button_large: {
      fontSize: 18,
      fontWeight: 700,
    },
    button_normal: {
      fontSize: 16,
      fontWeight: 600,
    },
    button_small: {
      fontSize: 14,
      fontWeight: 600,
    },

    // Displays
    display_1: {
      fontSize: 72,
      lineHeight: 1,
      fontWeight: 600,
      color: "#25324b",
    },
    display_2: {
      fontSize: 48,
      fontWeight: 600,
      color: "#25324b",
    },
    display_3: {
      fontSize: 20,
      fontWeight: 600,
      color: "#25324b",
    },
  },
  spacing: 1,
  shape: {
    borderRadius: 1,
  },
});
