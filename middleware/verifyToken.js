// verifyToken.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Check for the token being sent in a header or as a query parameter
  let token = req.get('Authorization') || req.query.token;
  
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      } else {
        // If valid token, attach decoded payload to request object
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    // No token was sent
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = verifyToken;
