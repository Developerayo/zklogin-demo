import { useLottie } from "./helpers/useLottie";
import loginAnimationData from "./components/interface/animations/login.json";
import googleAnimationData from "./components/interface/animations/google.json";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { container } = useLottie(loginAnimationData, true);
  const { container: googleAnimationContainer } = useLottie(
    googleAnimationData,
    true
  );
  const { nonce } = useContext(AuthContext);

  const REDIRECT_URI = "https//zklogin.netlify.app/dashboard";

  // const REDIRECT_URI = `${apiUrl}/dashboard`;

  const params = new URLSearchParams({
    state: new URLSearchParams({
      redirect_uri: REDIRECT_URI,
    }).toString(),
    client_id:
      "25769832374-famecqrhe2gkebt5fvqms2263046lj96.apps.googleusercontent.com",
    redirect_uri: "https://zklogin.netlify.app",
    response_type: "id_token",
    scope: "openid",
    nonce: nonce,
  });

  const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl text-gray-600 font-bold">ZKLogin Demo</h1>
      <div ref={container}></div>
      <a
        className="flex text-lg items-center justify-center border-solid border-[2px] border-gray-200 w-full gap-2 pr-4 rounded-md text-gray-700 hover:bg-gray-200 max-w-[20em] font-bold"
        href={loginURL}
      >
        <div className="max-w-[50px]" ref={googleAnimationContainer}></div>
        Login with Google
      </a>
    </div>
  );
}

export default App;
