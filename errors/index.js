
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({msg: err.msg});
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log(err)
res.status(500).send({msg: 'server error'});
};



// controller for error handling
exports.notAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed!" });
};