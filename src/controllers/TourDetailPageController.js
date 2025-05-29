const pool = require("../models/db");

exports.getHeritageDetail = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM LOCATION WHERE location_id = ?", [req.body.heritageId]);
    res.json(rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
