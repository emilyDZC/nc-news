const { fetchUser } = require("../models/users");

function getUser(req, res, next) {
  const { username } = req.params;
  fetchUser(username)
    .then(userData => {
      if (userData.length === 0) {
        next({ msg: "user not found", status: 404 });
      } else {
        res.status(200).send({ userData });
      }
    })
    .catch(next);
}

module.exports = { getUser };
