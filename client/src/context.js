import React, { useContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AppContext = React.createContext();

let initialUser = {};
let initialState = false;

if (localStorage.getItem("token")) {
  const decodedToken = jwt_decode(localStorage.getItem("token"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialUser = decodedToken;
    initialState = true;
  }
}

const AppProvider = ({ children }) => {
  let [user, setUser] = useState(initialUser);
  let [login, setLogin] = useState(initialState);
  const loginUser = ({ authorization }) => {
    localStorage.setItem("token", authorization);
    const decodedToken = jwt_decode(authorization);
    setUser(decodedToken);
    console.log(user);
    setLogin(true);
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setLogin(false);
  };
  return (
    <AppContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        login,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useGlobalContext };
