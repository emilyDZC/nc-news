
exports.handle500s = (err, req, res, next) => {
res.status(500).send({msg: 'server error'});
};



// controller for error handling
exports.notAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed!" });
};