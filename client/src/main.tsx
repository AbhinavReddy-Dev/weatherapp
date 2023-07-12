import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./state";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <GlobalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalProvider>
    </ChakraProvider>
  </React.StrictMode>
);
