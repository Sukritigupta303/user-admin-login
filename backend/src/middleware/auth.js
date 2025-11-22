const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  // Format: Bearer token
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token not valid" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✔ Decoded User", decoded);  // <- Aapka ye log tabhi chalega jab token valid hoga
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

