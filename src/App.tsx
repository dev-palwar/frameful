import { Routes, Route } from "react-router";
import { LandingPage, StudioPage } from "./pages";
import RecordingScreen from "./pages/RecordingScreen";

// Route configuration
// / renders LandingPage, /record renders RecordingScreen, /studio renders StudioPage
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/record" element={<RecordingScreen />} />
      <Route path="/studio" element={<StudioPage />} />
    </Routes>
  );
}
