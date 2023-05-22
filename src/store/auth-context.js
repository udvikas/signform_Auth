import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  Login: (token) => {},
  Logout: () => {},
});

export const AuthContextProvider = (props) => {
  const intitialToken = localStorage.getItem('tokenID');
  const [token, setToken] = useState(intitialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('tokenID', token )
    
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('tokenID');
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    Login: loginHandler,
    Logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;