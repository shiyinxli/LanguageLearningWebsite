import React, { useState } from "react";
import Today from "./pages/Today";
import Review from "./pages/Review";

function App() {
  const [page, setPage] = useState("today");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("today")}>Today's Words</button>
        <button onClick={() => setPage("review")}>Review</button>
      </nav>
      {page === "today" && <Today />}
      {page === "review" && <Review />}
    </div>
  );
}

export default App;
