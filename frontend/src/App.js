import React, { useState } from "react";
import Today from "./pages/Today";
import Review from "./pages/Review";

function App() {
  const [page, setPage] = useState("today");

  return (
    <div className="min-h-screen bg-[#fdf6e3] text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-[#f5ecd9] shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-[#7c6a4f] tracking-wide">
            Word Learning App
          </h1>
          <nav className="space-x-4">
            <button
              onClick={() => setPage("today")}
              className={`px-4 py-2 rounded-xl transition ${
                page === "today"
                  ? "bg-[#e3d3b5] text-[#4b3f2f] font-semibold shadow-sm"
                  : "hover:bg-[#eee4cf]"
              }`}
            >
              Today's Words
            </button>
            <button
              onClick={() => setPage("review")}
              className={`px-4 py-2 rounded-xl transition ${
                page === "review"
                  ? "bg-[#e3d3b5] text-[#4b3f2f] font-semibold shadow-sm"
                  : "hover:bg-[#eee4cf]"
              }`}
            >
              Review
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-[#e5dcc3]">
          {page === "today" && <Today />}
          {page === "review" && <Review />}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-[#7c6a4f] py-6">
        Built with ❤️ using React + Tailwind
      </footer>
    </div>
  );
}

export default App;
