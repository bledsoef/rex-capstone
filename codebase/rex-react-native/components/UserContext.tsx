import React, { createContext, useState, useContext } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>("");
  const [profileImage, setProfileImage] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        currentUser,
        profileImage,
        setProfileImage,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};