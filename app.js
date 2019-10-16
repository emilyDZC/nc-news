const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const { handleCustomErrors, handle500s} = require('./errors')

app.use(express.json());
app.use('/api', apiRouter);
// errors
app.all('/*', (req, res, next) =>
  res.status(404).send({ msg: 'Route not found' })
);
app.use(handleCustomErrors);
app.use(handle500s);


module.exports = { app };