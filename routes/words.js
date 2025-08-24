const express = require("express");
const pool = require("../db");
const router = express.Router();

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

module.exports = router;
