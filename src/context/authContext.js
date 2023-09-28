import { createContext, useCallback, useEffect, useState } from "react";
import { jwtToAddress } from "@mysten/zklogin";
import { useNonce } from "../helpers/useNonce";
import useLocalStorage from "../hooks/data/useLocalStorage";
import { useNavigate } from "react-router-dom";
// fix Buffer error
window.global = window;
window.Buffer = window.Buffer || require("buffer").Buffer;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [address, setAdress] = useState("");
  const { nonce } = useNonce();
  const [userToken, setUserToken] = useLocalStorage("jwtToken", "");
  const navigate = useNavigate();

  // Fetch Salt
  const fetchSalt = useCallback(async (jwtToken) => {
    if (!jwtToken) return "";

    try {
      const response = await fetch(
        `/.netlify/functions/zkLoginData?token=${jwtToken}`
      );
      const result = await response.json();
      if (result && typeof result !== "object") {
        throw new Error("Response is not in JSON format");
      }
      return result.salt;
    } catch (error) {
      console.error(error);
    }
    return "";
  }, []);

  // Obtain Address by using fetched salt and jwtToken
  const getAddress = useCallback(async (salt, token) => {
    const userAddress = jwtToAddress(token, salt);
    setAdress(userAddress);
  }, []);

  const fetchSaltAndGetAddress = useCallback(async () => {
    // If there is a userToken, fetch salt and get address
    if (userToken) {
      const salt = await fetchSalt(userToken);
      if (salt) getAddress(salt, userToken);
    }
  }, [fetchSalt, getAddress, userToken]);

  useEffect(() => {
    fetchSaltAndGetAddress();
  }, [fetchSaltAndGetAddress]);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get("id_token");
    if (idToken) setUserToken(idToken);
  }, [setUserToken]);

  const logout = () => {
    setUserToken("");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ address, nonce, logout, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
