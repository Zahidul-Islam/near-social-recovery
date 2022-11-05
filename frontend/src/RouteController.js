import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LeftSection from "./components/LeftSection";
import AddGuardianPage from "./pages/AddGuardianPage";
import CancelRecoveryPage from "./pages/CancelRecoveryPage";
import RecoverPage from "./pages/RecoverPage";
import RotateKeyPage from "./pages/RotateKeyPage";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

export default function RouteController() {
  // const {} = useContext(AuthContext);

  return (
    <div
      className="content"
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "red",
        minHeight: 700,
        height: "100vh",
        width: "100%",
      }}
    >
      <Header />

      <LeftSection />

      <Routes>
        <Route index path="/" element={<AddGuardianPage />} />
        <Route index path="/recover" element={<RecoverPage />} />
        <Route index path="/cancelRecovery" element={<CancelRecoveryPage />} />
        <Route index path="/rotateKey" element={<RotateKeyPage />} />
      </Routes>
    </div>
  );
}
