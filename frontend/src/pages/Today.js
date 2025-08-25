import React, { useEffect, useState } from "react";
import axios from "axios";

function Today() {
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/words/today")
      .then(res => setWords(res.data));
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
    await axios.post(`http://localhost:3000/words/${wordId}/learn`, {
      userId: 1,
      sentences: wordSentences
    });
    alert("Word learned!");
  };

  return (
    <div>
      <h2>Today's Words</h2>
      {words.map(word => (
        <div key={word.id} style={{ marginBottom: "20px" }}>
          <h3>{word.word} - {word.translation}</h3>
          <input
            placeholder="Sentence 1"
            onChange={e => handleChange(word.id, 0, e.target.value)}
          />
          <input
            placeholder="Sentence 2"
            onChange={e => handleChange(word.id, 1, e.target.value)}
          />
          <button onClick={() => handleSubmit(word.id)}>Mark Learned</button>
        </div>
      ))}
    </div>
  );
}

export default Today;
