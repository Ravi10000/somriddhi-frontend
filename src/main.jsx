import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./slider.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import LoginModalProvider from "./context/login-modal-context";
import SearchProvider from "./context/search.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <BrowserRouter>
    <Provider store={store}>
      <SearchProvider>
        <LoginModalProvider>
          <App />
        </LoginModalProvider>
      </SearchProvider>
    </Provider>
  </BrowserRouter>
  // {/* </React.StrictMode>, */}
);
