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
      <h2>Review</h2>
      {reviewWords.map(word => (
        <div key={word.id} style={{ marginBottom: "20px" }}>
          <h3>{word.word} - {word.translation}</h3>
          <ul>
            {word.examples.map((ex, i) => <li key={i}>{ex}</li>)}
          </ul>
        </div>
      ))}
      <button onClick={fetchReview}>Next Review</button>
    </div>
  );
}

export default Review;
