import { createContext, useCallback, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const fetchSalt = useCallback(async (jwtToken) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        token:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmNzI1NDEwMWY1NmU0MWNmMzVjOTkyNmRlODRhMmQ1NTJiNGM2ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyNTc2OTgzMjM3NC1mYW1lY3FyaGUyZ2tlYnQ1ZnZxbXMyMjYzMDQ2bGo5Ni5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjI1NzY5ODMyMzc0LWZhbWVjcXJoZTJna2VidDVmdnFtczIyNjMwNDZsajk2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3MzE4MDk1OTMwNDI1NDI4Nzg4Iiwibm9uY2UiOiJmN3pKc2xKM3ZjNE8teFM3U0dJc0o3QTRUS0kiLCJuYmYiOjE2OTU2Nzc3NzksImlhdCI6MTY5NTY3ODA3OSwiZXhwIjoxNjk1NjgxNjc5LCJqdGkiOiJmM2E4YTUyN2Q2NTQ5MDQ1ZDFmYzA2ZGQ5NTBkMDlkMzdmMjJmYjZmIn0.I4HPBAefza4Qk108O1wB7NFGkdbwm1md6SQ79Es73X_VCIE7C92qifCIedQwSQVo7rF3XhkbOzxxD73ntwbNj80d_1kuYWPagAMJuygtlysZY_OrDtJvtfErrdW_YX1v6cT8GjM2HyuumiKSfULt98ZwJQz7TUZoAtI28cxhBFDj7ptSXNAAieeHbI-pJZsoE50R9cxIW9ijs5iS43YkLxnodnAe5_obIrTfBB75xG36r_HferLIGfz59Q2-ikoIv3d6s4XazyN-SC_OzyvAgKEi116V_E-F85tgBWKRyyTVuiR5bZMbCk9jWE6GcPLnBkMWSZNLegbclJYGvJaZfg",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://salt.api-devnet.mystenlabs.com/get_salt",
        requestOptions
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get("id_token");
    console.log("id_token", idToken);
    if (idToken) {
      fetchSalt(idToken);
    }
  }, [fetchSalt]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
