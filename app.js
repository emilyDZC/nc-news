const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router')

app.use(express.json());
app.use('/api', apiRouter);
// errors
app.all('/*', (req, res, next) =>
  res.status(404).send({ msg: 'Route not found' })
);


module.exports = { app };