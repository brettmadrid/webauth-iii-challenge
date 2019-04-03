const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  const department = req.decodedJwt;
  console.log(department);
  Users.findByDepartment(department)
  .then(users => {
    res.status(201).json(users);
  })
  .catch(err => res.send(err));
});

module.exports = router;