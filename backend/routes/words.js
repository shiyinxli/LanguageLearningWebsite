const express = require("express");
const pool = require("../db");
const router = express.Router();
const auth = require("../middleware/auth");

// GET /words/today → 3 new unlearned words
router.get("/today", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM words WHERE is_learned = FALSE ORDER BY RANDOM() LIMIT 3"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST /words/:id/learn
// router.post("/:id/learn", async (req, res) => {
//   const { id } = req.params;
//   const { userId, sentences } = req.body;

//   if (!userId || !Array.isArray(sentences) || sentences.length < 2) {
//     return res.status(400).json({ error: "Need userId and two example sentences" });
//   }

//   try {
//     // 1. Save sentences into examples table
//     for (const sentence of sentences) {
//       await pool.query(
//         "INSERT INTO examples (word_id, user_id, sentence) VALUES ($1, $2, $3)",
//         [id, userId, sentence]
//       );
//     }

//     // 2. Mark word as learned
//     await pool.query(
//       "UPDATE words SET is_learned = TRUE, learned_at = NOW() WHERE id = $1",
//       [id]
//     );

//     res.json({ message: "Word marked as learned", wordId: id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Database error" });
//   }
// });
// Example: protect the "learn" route
router.post("/:id/learn", auth, async (req, res) => {
  const { sentences } = req.body;
  const userId = req.user.userId; // taken from JWT, not hardcoded
  const wordId = req.params.id;

  try {
    await pool.query(
      "INSERT INTO examples (user_id, word_id, sentence) VALUES ($1, $2, $3), ($1, $2, $4)",
      [userId, wordId, sentences[0], sentences[1]]
    );

    await pool.query(
      "UPDATE words SET is_learned = true, learned_at = NOW() WHERE id = $1",
      [wordId]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /review?userId=1
router.get("/review", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    // 1. Pick 3 random learned words
    const wordsResult = await pool.query(
      "SELECT * FROM words WHERE is_learned = TRUE ORDER BY RANDOM() LIMIT 3"
    );

    const words = wordsResult.rows;

    // 2. For each word, fetch example sentences by user
    const result = [];
    for (const word of words) {
      const examplesResult = await pool.query(
        "SELECT sentence FROM examples WHERE word_id = $1 AND user_id = $2",
        [word.id, userId]
      );

      result.push({
        id: word.id,
        word: word.word,
        translation: word.translation,
        examples: examplesResult.rows.map(r => r.sentence)
      });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});



module.exports = router;
