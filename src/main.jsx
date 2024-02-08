import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./app/store";


ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
   <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </BrowserRouter>
   </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// "firebase": "^9.23.0",