import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Workbox } from "workbox-window";
// import * as serviceWorker from "../src/service-worker";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if ("serviceWorker" in navigator) {
  const wb = new Workbox("/service-worker.js");

  wb.addEventListener("activated", (event) => {
    if (!event.isUpdate) {
      // Fresh service worker was installed
      console.log("Service Worker activated for the first time");
    } else {
      // Service worker update was installed
      console.log("Service Worker updated");
    }
  });

  wb.register().catch((error) =>
    console.log("Service Worker registration failed:", error)
  );
}
