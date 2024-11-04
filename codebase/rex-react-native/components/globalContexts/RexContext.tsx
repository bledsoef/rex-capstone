import React, { createContext, useState, useContext } from "react";
// Create the context
const RexContext = createContext<any>(null);

// Create a provider component
export const RexProvider = ({ children }: any) => {
  const [sentRecs, setSentRecs] = useState<any>(null);
  const [receivedRecs, setReceivedRecs] = useState<any>(null);
  const fetchRecData = async (currentUserID: any) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/getRecs?user_id=${currentUserID}`
      );
      const data = await response.json();
      setSentRecs(data["sent"]);
      setReceivedRecs(data["received"]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <RexContext.Provider
      value={{
        sentRecs,
        receivedRecs,
        setSentRecs,
        setReceivedRecs,
        fetchRecData
      }}
    >
      {children}
    </RexContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useRexContext = () => {
  return useContext(RexContext);
};
