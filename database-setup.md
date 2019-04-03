1. yarn
2. npm init -y - add "server": "nodemon index.js" to startup scripts in package.json file
3. add dependencies express, knex, sqlite3, cors, & bcryptjs
4. yarn add nodemon -d
5. create /database directory for database
6. knex init to create knexfile.js - set up file to work with sqlite3 and database, set migrations/seeds path
7. set up users table - knex migrate:make createUsersTable - set up code to define table
8. set up dbConfig file in database directory.  Add following code:

  const knex = require('knex');

  const knexConfig = require('../knexfile.js');

  module.exports = knex(knexConfig.development);

9. Run knex migrate:latest to create table - check in sqlite3Studio to ensure created properly.

10. create an index.js file to start up the server.  Put the following in it:

  const server = require('./api/server.js');

  const PORT = process.env.PORT || 9000;

  server.listen(PORT, () => {
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
  });

11. Create an api folder and create server.js in it with the following:

  const express = require("express");
  const helmet = require("helmet");
  const cors = require("cors");

  const authRouter = require('../auth/auth-router.js');
  const usersRouter = require('../users/users-router.js');

  const server = express();

  server.use(express.json());
  server.use(helmet());
  server.use(cors());

  server.use('/api/auth', authRouter)
  server.use('/api/users', usersRouter)

  server.get("/", (req, res) => {
    res.send("I am Son of Hal ... I am always watching!");
  });

  module.exports = server;

12. Create an auth directory and create two files in that directory:

  auth-router.js
  restricted-middleware.js

13. in the auth-router.js file put the following code:

  const router = require('express').Router();
  const bcrypt = require('bcryptjs');

  const Users = require('../users/users-model.js');

  // for endpoints beginning with /api/auth
  router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({
            message: `Welcome ${user.username}!`,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  module.exports = router;


14. in the restricted-middleware.js file put the following code:

  const bcrypt = require('bcryptjs');

  const Users = require('../users/users-model.js');

  module.exports = (req, res, next) => {
    const { username, password } = req.headers;

    if (username && password) {
      Users.findBy({ username })
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
        })
        .catch(error => {
          res.status(500).json({ message: 'Ran into an unexpected error' });
        });
    } else {
      res.status(400).json({ message: 'No credentials provided' });
    }
  };

15. create users directory and create two files in it:

    users-model.js
    users-router.js

16. in the users-router.js file, put the following code:

  const router = require('express').Router();

  const Users = require('./users-model.js');
  const restricted = require('../auth/restricted-middleware.js');

  router.get('/', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.send(err));
  });

  module.exports = router;

17. in the users-model.js file, put in the helper function code:

  const db = require('../database/dbConfig.js');

  module.exports = {
    add,
    find,
    findBy,
    findById,
  };

  function find() {
    return db('users').select('id', 'username', 'password');
  }

  function findBy(filter) {
    return db('users').where(filter);
  }

  async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
  }

  function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }
