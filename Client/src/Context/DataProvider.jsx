import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {  

  const backendUrl = "https://consultancy-backend-rdmf.onrender.com";

  // ----------------------------------------------------------------------------
  
  const [account, setAccount] = useState(() => {
    const savedAccount = sessionStorage.getItem("account");
    return savedAccount ? JSON.parse(savedAccount) : { name: "", role: "", accesstoken:"", refreshtoken:"", email:"" };
  });

  useEffect(() => {
    if (account) {
      sessionStorage.setItem("account", JSON.stringify(account));
    }
  }, [account]);  
  
  // ----------------------------------------------------------------------------

  return (
    <DataContext.Provider value={{
      backendUrl,
      account,
      setAccount
    }}>
      {children}  
    </DataContext.Provider>
  );
}

export default DataProvider;
