const pool = require("../models/db");

exports.addComment = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const customer_id = req.user.id; // Assuming user ID is stored in req.user.id after authentication
    // console.log(req.body)
    await pool.query(`
        INSERT INTO REVIEWS (CUSTOMER_ID, TOUR_ID, comment, rating)
        VALUES (?, ?, ?, ?)`,
        [customer_id, 1, text, rating]
    );
    res.status(201).json({ message: "Comment added successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    // Thêm tên user ở chỗ comment 
    const [rows] = await pool.query(`
        SELECT * FROM REVIEWS JOIN CUSTOMERS ON REVIEWS.CUSTOMER_ID = CUSTOMERS.customer_id`
    );
    res.json(rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
