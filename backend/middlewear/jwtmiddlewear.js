const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token synchronously
    const decoded = jwt.verify(token.split(" ")[1], 'Secret JWT key');
    // If token is valid, store decoded payload in request for further use
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = verifyToken;
