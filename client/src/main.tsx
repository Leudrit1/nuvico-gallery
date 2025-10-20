import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initLang } from "./lib/i18n";

initLang();
createRoot(document.getElementById("root")!).render(<App />);
