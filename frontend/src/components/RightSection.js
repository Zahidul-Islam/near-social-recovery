import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function RightSection() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor2,
      }}
    >
      RightSection
    </div>
  );
}
