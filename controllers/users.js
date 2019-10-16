const {fetchUser} = require('../models/users')

function getUser(req, res, next) {
  const {username} = req.params;
  fetchUser(username).then((userData) => {
    if (userData === undefined ) next({msg: 'user not found'});
    console.log(userData)
    res.status(200).send({ userData })
  }).catch(next);
}  

module.exports = {getUser}