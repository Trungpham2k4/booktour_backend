const pool = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    const { username, password, email, phoneNumber } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO CUSTOMERS (name, email, phone, password) VALUES (?, ?, ?, ?)", 
        [username, email, phoneNumber, hashedPassword]);
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const [rows] = await pool.query("SELECT * FROM CUSTOMERS WHERE name = ?", [username]);
    
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.customer_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, 
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}