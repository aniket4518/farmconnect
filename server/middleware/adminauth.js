const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Not an admin." });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in adminAuth middleware:", error.message);
        res.status(400).json({ error: "Invalid token.", details: error.message });
    }
};

module.exports = adminAuth;