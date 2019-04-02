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

    const secret = 'I like your nosering';

    return jwt.sign(payload, secret, options)
  };


