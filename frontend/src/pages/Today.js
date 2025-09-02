import React, { useEffect, useState } from "react";
import axios from "axios";




function Today() {
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState({});
  // const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/words/today", {
      headers: { Authorization: `Bearer ${token}` },
    }
    )
      .then(res => setWords(res.data))
      .catch(error =>{ console.error("Error fetching today's words:", error);
    if(error.response?.status === 401) {
      alert("Please log in to access today's words.");
    } });
  }, []);

  const handleChange = (wordId, index, value) => {
    setSentences(prev => ({
      ...prev,
      [wordId]: {
        ...prev[wordId],
        [index]: value
      }
    }));
  };

  const handleSubmit = async (wordId) => {
    const wordSentences = Object.values(sentences[wordId] || {});
    if (wordSentences.length < 2) {
      alert("Please enter 2 sentences");
      return;
    }
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:3000/words/${wordId}/learn`, 
      {sentences: wordSentences},
      { headers: { Authorization: `Bearer ${token}` ,}, });
    alert("Word learned!");
  };

  return (
  <div className="font-mono">
    <h2 className="text-2xl font-semibold mb-4">Today's Words</h2>
    {words.map(word => (
      <div key={word.id} className="bg-white rounded-xl shadow p-4 mb-4">
        <h3 className="text-xl font-bold">{word.word}</h3>
        <p className="text-gray-600 mb-2">{word.translation}</p>
        <input
          className="w-full border rounded p-2 mb-2"
          placeholder="Sentence 1"
          onChange={e => handleChange(word.id, 0, e.target.value)}
        />
        <input
          className="w-full border rounded p-2 mb-2"
          placeholder="Sentence 2"
          onChange={e => handleChange(word.id, 1, e.target.value)}
        />
        <button
          onClick={() => handleSubmit(word.id)}
          className="bg-[#AEB0D3] text-white px-4 py-2 rounded hover:bg-[#BFC2EF]"
        >
          Gelernt
        </button>
      </div>
    ))}
  </div>
);

}

export default Today;
