// backend/routes/words.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/auth");

// Get today's words (protected)
router.get("/today", verifyToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM words WHERE is_learned = false LIMIT 3");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Mark word as learned (protected)
router.post("/:id/learn", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { sentences } = req.body;
  const userId = req.user.id; // ✅ from JWT

  try {
    await pool.query("UPDATE words SET is_learned = true, learned_at = NOW() WHERE id = $1", [id]);

    for (const sentence of sentences) {
      await pool.query(
        "INSERT INTO examples (user_id, word_id, sentence) VALUES ($1, $2, $3)",
        [userId, id, sentence]
      );
    }

    res.json({ message: "Word learned!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/review", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // from JWT

    const result = await pool.query(
      `SELECT w.id, w.word, w.translation,
              array_agg(e.sentence) AS examples
       FROM words w
       JOIN examples e ON w.id = e.word_id
       WHERE e.user_id = $1
       GROUP BY w.id, w.word, w.translation
       ORDER BY random()
       LIMIT 3`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
