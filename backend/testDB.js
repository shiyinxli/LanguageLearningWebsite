const pool = require("./db");

async function test() {
  const res = await pool.query("SELECT NOW()");
  console.log("DB connected:", res.rows[0]);
  process.exit();
}

test();
