function App() {
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
    <div className="">
      <h1 className="text-xl font-bold">Welcome to ZKLogin Demo App</h1>
      <a
        className="px-4 py-2 rounded-md text-white font-semibold bg-indigo-600"
        href={loginURL}
      >
        Login with google
      </a>
    </div>
  );
}

export default App;
