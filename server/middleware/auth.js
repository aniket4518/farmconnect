const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        console.log("Auth middleware hit");
        let token = req.header("Authorization");
        console.log("Authorization header value:", token); // Log the token value

        if (!token) {
            console.error("No token provided in Authorization header");
            return res.status(401).json({ msg: "Authorization error: No token provided" });
        }

        // Handle "Bearer <token>" format
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim(); // Remove "Bearer " prefix
        } else {
            console.warn("Authorization header does not start with 'Bearer '");
        }

        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("process.env.JWT_SECRET:", process.env.JWT_SECRET); 
        if (!verified) {
            console.error("Token verification failed");
            return res.status(401).json({ msg: "Authorization error: Invalid token" });
        }

        req.user = verified; // Attach the decoded token payload to req.user
        console.log("Token verified successfully. User payload:", req.user);
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error.message);
        res.status(500).json({ msg: "Authorization error", error: error.message });
    }
};

module.exports = auth;