import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ReturnIcon } from "../components/interface/icons/returnIcon";
import { useLottie } from "../helpers/useLottie";
import lostAnimationData from "../components/interface/animations/lost.json";

export default function DashboardView() {
  const { address, logout, userToken } = useContext(AuthContext);
  const { container: lostAnimationContainer } = useLottie(
    lostAnimationData,
    true
  );

  if (!userToken) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div ref={lostAnimationContainer}></div>
        <h2 className="text-xl text-center font-bold">
          Sorry you have to login to access this page
        </h2>
        <a
          href="/"
          className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-400 max-w-[15em] px-6 py-2 cursor-pointer text-white font-semibold text-lg rounded-md"
        >
          Return to Login
          <ReturnIcon className="w-5" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 items-center justify-between">
      <h2 className="text-xl font-bold">Welcome!!!</h2>
      <p className="break-all text-center">{address}</p>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-500 px-6 py-2 cursor-pointer text-white font-semibold text-lg rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
