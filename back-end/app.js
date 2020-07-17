
const express = require("express");

const ExpressError = require("./helpers/expressError");

const morgan = require("morgan");

const app = express();

const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users');
// const { authorize } = require('./middleware/auth');

app.use(express.json());

// add logging system
app.use(morgan("tiny"));

// allow every route to check if correct JWT token was sent
// use(authorize);app.

app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);


/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
