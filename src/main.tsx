import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import * as process from "process";
import { persistor, store } from "./services/redux/store/store";

window.global = window;
window.process = process;

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
