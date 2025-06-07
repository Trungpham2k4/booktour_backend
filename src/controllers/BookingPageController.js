const pool = require("../models/db");


exports.getAllBookedTours = async (req, res) => {
    try {
        const [rows] = await pool.query(
        `SELECT 
            TOURS.tour_id, 
            TOURS.name AS tour_name, 
            TOURS.detailed_itinerary, 
            TOURS.duration, 
            TOURS.price, 
            TOURS.description, 
            TOURS.tour_type_id, 
            TOUR_TYPES.name AS tour_type_name,
            BOOKINGS.booking_id,
            BOOKINGS.num_guests,
            BOOKINGS.total_price,
            BOOKINGS.booking_date,
            BOOKINGS.payment_status
            FROM BOOKINGS JOIN TOURS JOIN TOUR_TYPES ON TOURS.tour_type_id = TOUR_TYPES.tour_type_id AND BOOKINGS.tour_id = TOURS.tour_id
        WHERE BOOKINGS.customer_id = ?`,
        [req.body.customerId] // Assuming user ID is stored in req.user.id after authentication
        );
        console.log(rows);
        res.json(rows);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getTourById = async (req, res) => {
  try {
    const tourId = req.body.tourId;
    
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
    WHERE TOURS.tour_id = ?`,
    [`${tourId}`]);
    console.log(rows[0]);
    res.json(rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTransport = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM TRANSPORT");
        res.json(rows);
    }catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getTourGuide = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM TOUR_GUIDES");
        res.json(rows);
    }catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getTourType = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM TOUR_TYPES");
        res.json(rows);
    }catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.saveBooking = async (req, res) => {
    try {
        const {customerId , tourId, numGuests, unitPrice} = req.body;
        const totalPrice = numGuests * unitPrice;
        console.log(req.body);
        await pool.query(
        `INSERT INTO BOOKINGS (customer_id, tour_id,  num_guests,  total_price, staff_id)
         VALUES (?, ?, ?, ?, ?)`,
        [customerId, tourId, numGuests, totalPrice, 1] // Assuming staff_id is 1 for simplicity, adjust as needed
        );
        
        res.status(201).json({ message: "Booking saved successfully" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}