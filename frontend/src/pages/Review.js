import React, { useEffect, useState } from "react";
import axios from "axios";

function Review() {
  const [reviewWords, setReviewWords] = useState([]);

  const fetchReview = () => {
    axios.get("http://localhost:3000/words/review?userId=1")
      .then(res => setReviewWords(res.data));
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Review</h2>
      {reviewWords.map(word => (
        <div key={word.id} style={{ marginBottom: "20px" }}>
          <h3 className="text-xl font-bold">{word.word} - {word.translation}</h3>
          <ul className="list-disc list-inside italic">
            {word.examples.map((ex, i) => <li key={i}>{ex}</li>)}
          </ul>
        </div>
      ))}
      <button className="bg-[#AEB0D3] text-white px-4 py-2 rounded hover:bg-[#BFC2EF]" onClick={fetchReview}>Next Review</button>
    </div>
  );
}

export default Review;
