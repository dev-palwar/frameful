import { Routes, Route } from "react-router";
import { LandingPage, StudioPage, RecordingPage, PrivacyPage } from "@/pages";

// Route configuration
// / renders LandingPage, /record renders RecordingScreen, /studio renders StudioPage
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/record" element={<RecordingPage />} />
      <Route path="/studio" element={<StudioPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}
