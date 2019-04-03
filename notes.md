1. add jsonwebtoken dependency - yarn add jsonwebtoken
2. require jwt in the auth-router.js file:

  const jwt = require('jsonwebtoken');

3. in auth-router.js add a token helper function that takes an object (user) with the userid and username as an argument.

  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };

    const options = {
      expiresIn: '1d'
    };

    return jwt.sign(payload, jwtSecret, options)
  };

4. make a directory called config create a secrets.js file inside it to store the secret.  Add this file to the .gitignore file:

  #config secrets
  config/secrets.js

5. in the secrets.js file add the following:

  module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'I like your nosering'
  }

6. now in auth-router.js require the jwtSecret:

  const { jwtSecret } = require('../config/secrets');

7. in the login endpoint, right after the bcrypt compareSync line, create the token:

  const token = generateToken(user);

  and in the res add the token as an additional parameter along with the message:

  res.status(200).json({message: `Welcome ${user.username}!`, token})

8. test in postman

9. now in restricted-middleware.js refactor all the code since we no longer need to check to see if a user is properly logged in.  All we have to do is check for a valid web token now. First add the necessary require file:

  const jwt = require('jsonwebtoken');

  const { jwtSecret } = require('../config/secrets.js');

  For the function body:

  module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'user not verified!'});
        } else {
          req.decodedJwt = decodedToken; // ask about this
          next();
        }
      })
    } else {
      res.status(401).json({ message: 'user not verified!'});
    }
  }
