const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = headers.split(" ")[1];
    try{
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        console.log("User authenticated:", req.user);
        next(); // Call the next middleware or route handler
    }catch(error){
        console.error("JWT verification failed:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};  