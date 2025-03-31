import { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

  // http://localhost:5001
  // https://consultancy-admin-backend.onrender.com

  const backendUrl = "https://consultancy-admin-backend.onrender.com";

  // ----------------------------------------------------------------------------

  const [account, setAccount] = useState(() => {
    const savedAccount = sessionStorage.getItem("account");
    return savedAccount ? JSON.parse(savedAccount) : { type: "", accesstoken:"", refreshtoken:"", email:"", name:"" };
  });

  useEffect(() => {
    if (account) {
      sessionStorage.setItem("account", JSON.stringify(account));
    }
  }, [account]);  

  return (
    <DataContext.Provider
      value={{
        backendUrl,
        account,
        setAccount
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
