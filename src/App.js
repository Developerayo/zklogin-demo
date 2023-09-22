import { useLottie } from "./helpers/useLottie";
import animationData from "./components/interface/animations/login.json";
import anotherAnimation from "./components/interface/animations/google.json";

function App() {
  const { container } = useLottie(animationData, true);
  const { container: newAnimation } = useLottie(anotherAnimation, true);
  const REDIRECT_URI = "http://localhost:3000/dashboard";

  const params = new URLSearchParams({
    // When using the provided test client ID + redirect site, the redirect_uri needs to be provided in the state.
    state: new URLSearchParams({
      redirect_uri: REDIRECT_URI,
    }).toString(),
    // Test Client ID for devnet / testnet:
    client_id:
      "25769832374-famecqrhe2gkebt5fvqms2263046lj96.apps.googleusercontent.com",
    redirect_uri: "https://zklogin-dev-redirect.vercel.app/api/auth",
    response_type: "id_token",
    scope: "openid",
    // See below for details about generation of the nonce
    nonce: "$NONCE",
  });

  const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl text-gray-600 font-bold">ZKLogin Demo</h1>
      <div ref={container}></div>
      <a
        className="flex text-lg items-center justify-center w-full gap-4 pr-4 rounded-md text-gray-700 hover:bg-gray-200 max-w-[20em] font-bold bg-[#e4e4e4]"
        href={loginURL}
      >
        <div className="max-w-[60px]" ref={newAnimation}></div>
        Login with google
      </a>
    </div>
  );
}

export default App;
