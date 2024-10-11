import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster />
    <PayPalScriptProvider
      options={{
        "client-id":
          "AU4MKe_piZqOVMNRreAYGcI1B7vbaQ9jJ-LxUbhuPD_1NewTeqSr8ZLX-cfe1_re_K2XSlXYZ-_Q9PkM",
      }}
    >
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
