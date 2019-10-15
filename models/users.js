const { connection } = require("../db/connection");

function fetchUser(username) {
  console.log(username)
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username)
    .then(result => {
      return result;
    });
}

// not sure why username is not working

module.exports = { fetchUser };
