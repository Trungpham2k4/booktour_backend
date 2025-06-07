const pool = require("../models/db");


exports.getBookedTourById = async (req, res) => {

    try {
        const [rows] = await pool.query(
        `SELECT *
        FROM BOOKINGS
        WHERE BOOKINGS.booking_id = ?`,
        [req.body.bookingId] // Assuming user ID is stored in req.user.id after authentication
        );
        console.log(rows[0]);
        res.json(rows[0]);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.processPayment = async (req, res) => {
    try {
        const { bookingId, paymentMethod, totalPrice } = req.body;
        console.log(req.body);

        // Update the payment status in the BOOKINGS table
        await pool.query(
            `UPDATE BOOKINGS 
            SET payment_status = 'Đã thanh toán'
            WHERE booking_id = ?`,
            [bookingId]
        );

        const [result] = await pool.query(
            `INSERT INTO INVOICES (booking_id, payment_method, payment_date, total_amount, employee_id)
            VALUES (?, ?, NOW(), ?, 1)`,
            [bookingId, paymentMethod, totalPrice]
        );
        console.log(result.affectedRows);
        if (result.affectedRows > 0) {
            res.json({ message: "Payment processed successfully" });
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}