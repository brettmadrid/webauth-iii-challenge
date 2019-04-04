const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');


module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'NOPE!'});
      } else {
        req.decodedJwt = decodedToken; // ask about this
        next();
      }
    })
  } else {
    res.status(401).json({ message: 'user not verified!'});
  }
};
