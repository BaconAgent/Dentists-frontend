import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";
import BigCalendar from "./components/BigCalendar";
import Header from "./components/Header";
import "./styles.css";

function App() {
  return (
    <Auth0Provider
      domain="dev-twctg5mxoooke8y4.eu.auth0.com"
      clientId="vZyAmgrtmo7G5bplqYjXCIwsimVNCXxc"
      redirectUri={window.location.origin}
    >
      <div className="App">
        <Header />
        <BigCalendar />
      </div>
    </Auth0Provider>
  );
}

export default App;
