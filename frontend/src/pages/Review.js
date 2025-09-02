import React, { useEffect, useState } from "react";
import axios from "axios";

function Review() {
  const [reviewWords, setReviewWords] = useState([]);
  const token = localStorage.getItem("token");

  const fetchReview = async () => {
    try {
      const res = await axios.get("http://localhost:3000/words/review", {
        headers: {
          Authorization: `Bearer ${token}`, // send JWT
        },
      });
      setReviewWords(res.data);
    } catch (err) {
      console.error("Error fetching review words:", err);
      alert("Session expired, please log in again.");
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className="font-mono">
      <h2 className="text-2xl font-semibold mb-4">Review</h2>
      {reviewWords.map((word) => (
        <div
          key={word.id}
          className="bg-white rounded-xl shadow p-4 mb-4"
        >
          <h3 className="text-xl font-bold">
            {word.word} - {word.translation}
          </h3>
          <ul className="list-disc list-inside italic text-gray-700">
            {word.examples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      ))}
      <button
        className="bg-[#AEB0D3] text-white px-4 py-2 rounded hover:bg-[#BFC2EF]"
        onClick={fetchReview}
      >
        Next Review
      </button>
    </div>
  );
}

export default Review;
