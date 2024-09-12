import React, { createContext, useState, useEffect } from "react";

// Create the Context
export const GlobalServiceContext = createContext();

// Create the Provider Component
export const GlobalServiceProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const updateCurentUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <GlobalServiceContext.Provider value={{ currentUser, updateCurentUser }}>
      {children}
    </GlobalServiceContext.Provider>
  );
};
