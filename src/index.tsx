import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <CssBaseline>
            <App />
          </CssBaseline>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
