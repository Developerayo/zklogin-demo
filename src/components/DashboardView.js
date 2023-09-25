import React from "react";

// const isAuthenticated = () => {
//   const token = localStorage.getItem("nonce");
//   // Check if the token is valid or if it meets your authentication criteria
//   console.log(token);
//   return !!token;
// };

export default function DashboardView() {
  // if (!isAuthenticated()) {
  //   return <App to="/" />; // Redirect to login page if not authenticated
  // }
  return (
    <div>
      Welcome!!!{" "}
      <button className="bg-red-600 hover:bg-red-500 px-6 py-2 cursor-pointer text-white font-semibold text-lg rounded-md">
        Logout
      </button>
    </div>
  );
}
