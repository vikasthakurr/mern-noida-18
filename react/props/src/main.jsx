import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Drilling from "./Drilling.jsx";
import Lifting from "./Lifting.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Drilling /> */}
    <Lifting />
  </StrictMode>,
);
