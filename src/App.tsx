import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import StudioPage from "./pages/StudioPage";

// Route configuration — / renders HomePage, /studio renders StudioPage
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/studio" element={<StudioPage />} />
    </Routes>
  );
}
