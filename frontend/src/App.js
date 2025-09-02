import React, { useState } from "react";
import Today from "./pages/Today";
import Review from "./pages/Review";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [page, setPage] = useState("signup"); // start at signup
  const token = localStorage.getItem("token");
  

  if (!token) {
    if (page === "signup") {
      return <Signup switchToLogin={() => setPage("login")} />;
    }
    return <Login 
    switchToSignup={() => setPage("signup")}
    onLogin={() => setPage("today")} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <nav className="flex gap-4 p-4 bg-[#E6D8AD] shadow">
        <button onClick={() => setPage("today")} className="font-bold">
          Today's Words
        </button>
        <button onClick={() => setPage("review")} className="font-bold">
          Review
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="ml-auto text-red-600"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        {page === "today" && <Today />}
        {page === "review" && <Review />}
      </div>
    </div>
  );
}

export default App;
