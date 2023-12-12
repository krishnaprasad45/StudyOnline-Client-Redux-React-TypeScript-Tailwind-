import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./services/redux/store/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
