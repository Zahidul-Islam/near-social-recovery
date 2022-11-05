import { useState, createContext } from "react";
// NEAR
import { SocialRecovery } from "../../near-interface";
import { Wallet } from "../../near-wallet";

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME });

// Abstract the logic of interacting with the contract to simplify your flow
const socialRecovery = new SocialRecovery({
  contractId: process.env.CONTRACT_NAME,
  walletToUse: wallet,
});

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser, wallet, socialRecovery }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
