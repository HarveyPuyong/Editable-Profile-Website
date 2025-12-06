const jwt = require('jsonwebtoken');

// Middleware to verify access token
const verifyJWT = (req, res, next) => {
  console.log("====================================");
  console.log("VERIFY JWT MIDDLEWARE");
  console.log("Headers received:", req.headers);
  console.log("Authorization header:", req.headers.authorization || req.headers.Authorization);
  console.log("ACCESS_TOKEN_SECRET length:", process.env.ACCESS_TOKEN_SECRET?.length);
  console.log("====================================");

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    console.log("❌ No Authorization header found!");
    return res.status(401).json({ message: "Unauthorized: No authorization header" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.log("❌ Authorization header does NOT start with 'Bearer '");
    console.log("Received header:", authHeader);
    return res.status(401).json({ message: "Unauthorized: Incorrect authorization header format" });
  }

  const accessToken = authHeader.split(" ")[1];
  console.log("Extracted access token:", accessToken);

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("❌ JWT VERIFY ERROR:");
        console.log("Error name:", err.name);
        console.log("Error message:", err.message);

        return res.status(403).json({ message: `Forbidden: ${err.message}` });
      }

      console.log("✅ TOKEN VERIFIED SUCCESSFULLY");
      console.log("Decoded token payload:", decoded);

      req.user = { id: decoded.id };
      next();
    }
  );
};

module.exports = verifyJWT;
