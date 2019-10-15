const fetchUser = require('../models/users')

function getUser(req, res, next) {
  const {username} = req.params;
  // console.log({username})
  fetchUser(username).then((userData) => {
    res.status(200).send({ userData })
  })
}

module.exports = {getUser}