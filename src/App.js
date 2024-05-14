import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import Reserve from "./Reserve";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButon";

function App() {
  return (
    <Auth0Provider
      domain="dev-twctg5mxoooke8y4.eu.auth0.com"
      clientId="vZyAmgrtmo7G5bplqYjXCIwsimVNCXxc"
      redirectUri={window.location.origin}
    >
      <div className="App">
        <LoginButton />
        <LogoutButton />
        <Reserve />
      </div>
    </Auth0Provider>
  );
}

export default App;
