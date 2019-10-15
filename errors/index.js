

// exports.handle500s = (err, req, res, next) {

// }




// controller for error handling
exports.notAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed!" });
};