
const jwt = require("jsonwebtoken");

module.exports = async verifyToken (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the the user down to the endpoints here
    request.user = user;

    // pass down functionality to the endpoint
    next();
    
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

// import jwt from 'jsonwebtoken';

// export default async function verifyToken(req, res, next) {
//   const token = req.cookies.token;
//   try {
//     const user = jwt.verify(token, process.env.SECRET);
//     req.user = user;
//     next();
//   } catch (err) {
//     res.clearCookie("token");
//     return res.redirect("/");
//   }
// };


// export default async function verifyToken(req, res, next) {

//   // Check for the token being sent in a header or as a query parameter
//   let token = req.get('Authorization') || req.query.token;
//   if (token) {

//     // Remove the 'Bearer ' if it was included in the token header
//     token = token.replace('Bearer ', '');

//     // Check if token is valid and not expired
//     jwt.verify(token, process.env.SECRET, function(err, decoded) {

//       // If valid token, decoded will be the token's entire payload
//       // If invalid token, err will be set
//       console.log(decoded);
//       req.user = err ? null : decoded.user;

//       // If your app cares... (optional)
//       req.exp = err ? null : new Date(decoded.exp * 1000);  
//       return next();
//     });
//   } else {
    
//     // No token was sent
//     req.user = null;
//     return next();
//   }
// }