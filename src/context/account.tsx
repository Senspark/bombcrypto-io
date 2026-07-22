import React, { createContext, useRef, useContext, useState } from 'react';

export const AccountContext = createContext<any>({});

// @ts-ignore
function Account({ children }) {
  const [auth, setAuth] = useState<any>({
    wallet: {},
    address: '',
    logged: false,
    user: {},
  });

  const clear = useRef();

  const logout = () => {
    setAuth({ wallet: {}, address: '', logged: false, user: {} });
  };

  const updateWallet = async (bcoin: any) => {
    setAuth({
      ...auth,
      wallet: { ...auth.wallet, bcoin },
    });
  };

  return (
    <AccountContext.Provider
      value={{ auth, setAuth, logout, clear, updateWallet }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export const useAccount = () => {
  return useContext(AccountContext);
};

export default Account;
