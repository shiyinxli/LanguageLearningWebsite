const express = require("express");
const cors = require("cors");
const wordsRouter = require("./routes/words");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/words", wordsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
