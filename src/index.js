import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const providerConfig ={
//   domain:"dev-twctg5mxoooke8y4.eu.auth0.com",
//   clientId:"vZyAmgrtmo7G5bplqYjXCIwsimVNCXxc",

// }

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-twctg5mxoooke8y4.eu.auth0.com"
      clientId="vZyAmgrtmo7G5bplqYjXCIwsimVNCXxc"
      authorizationParams={{
        audience: "https:/dentists-backend",
        scope: "openid offline_access",
      }}
      redirectUri="http://localhost:3000"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
