import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { RecorderProvider } from "./providers/recorder-provider.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import Header from "./components/shared/Header.tsx";
import Footer from "./components/shared/Footer.tsx";

// RecorderProvider wraps the router so recording state survives route changes
createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <BrowserRouter>
      <RecorderProvider>
        <Header />
        <App />
        <Footer />
      </RecorderProvider>
    </BrowserRouter>
  </ThemeProvider>,
);
