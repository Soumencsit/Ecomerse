import React, { createContext, useEffect, useState } from "react";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [userLogin, setUserLogin] = useState(
    JSON.parse(localStorage.getItem("userLogin")) || false
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || ""
  );

  // Save user state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);
  }, [userLogin, userId, userName]);

  const contextValue = {
    userLogin,
    setUserLogin,
    userId,
    setUserId,
    userName,
    setUserName,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StorecontextProvider;
