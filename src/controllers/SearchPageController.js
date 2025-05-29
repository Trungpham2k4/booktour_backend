const pool = require("../models/db");

exports.searchTour = async (req, res) => {
  try {
    // console.log(req.body);
    const tourName = req.body.tourName;
    const tourType = req.body.tourType || '%%'; // Default to all types if not provided
    // const transportType = req.body.transportType;
    console.log(req.body);
    const [rows] = await pool.query(
    `SELECT 
        TOURS.tour_id, 
        TOURS.name AS tour_name, 
        TOURS.detailed_itinerary, 
        TOURS.duration, 
        TOURS.price, 
        TOURS.description, 
        TOURS.tour_type_id, 
        LOCATION.image,
        TOUR_TYPES.name AS tour_type_name
    FROM LOCATION JOIN TOURS JOIN TOUR_TYPES ON TOURS.tour_type_id = TOUR_TYPES.tour_type_id AND LOCATION.tour_id = TOURS.tour_id
    WHERE TOURS.name LIKE ? AND TOUR_TYPES.name LIKE ?`,
    [`%${tourName}%`,  `${tourType}`]
    );

    console.log(rows)
    res.json(rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
