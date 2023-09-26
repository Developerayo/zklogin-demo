import { createContext, useCallback, useEffect, useState } from "react";
import { jwtToAddress } from "@mysten/zklogin";
window.global = window;
window.Buffer = window.Buffer || require("buffer").Buffer;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [address, setAdress] = useState("");
  const fetchSalt = useCallback(async (jwtToken) => {
    try {
      const response = await fetch(`http://localhost:5000?token=${jwtToken}`);
      const result = await response.json();
      return result.salt;
    } catch (error) {
      console.error(error);
    }
    return "";
  }, []);

  const getAddress = useCallback(
    async (idToken) => {
      if (idToken) {
        const salt = await fetchSalt(idToken);
        const userAddress = jwtToAddress(idToken, salt);
        console.log(userAddress);
        setAdress(userAddress);
      }
    },
    [fetchSalt]
  );

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get("id_token");
    getAddress(idToken);
  }, [fetchSalt, getAddress]);

  return (
    <AuthContext.Provider value={{ address }}>{children}</AuthContext.Provider>
  );
};
