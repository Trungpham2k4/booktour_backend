const pool = require("../models/db");

exports.getAllHeritage = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM LOCATION");
    res.json(rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
