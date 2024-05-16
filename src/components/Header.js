import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header>
      <nav>
        {isAuthenticated ? (
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Login</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
