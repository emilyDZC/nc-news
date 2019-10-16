const { connection } = require("../db/connection");

function fetchUser(username) {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username)
    .then(result => {
      // console.log(result)
      return result;
    });
}

// not sure why username is not working

module.exports = { fetchUser };
