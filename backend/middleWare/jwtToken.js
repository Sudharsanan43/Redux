import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]; // Extract token
        if (!token) return res.status(401).json({ error: "Access Denied" });

        const verified = jwt.verify(token, process.env.JWT_SECRET); // Use secure secret key
        req.user = verified; // Attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or Expired Token" });
    }
};

export default verifyToken;
