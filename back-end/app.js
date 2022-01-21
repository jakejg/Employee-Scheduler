const express = require("express");
const ExpressError = require("./helpers/expressError");
const morgan = require("morgan");
const cors = require("cors");

const app = express();


const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const compRoutes = require('./routes/companies');
const { authorize } = require('./middleware/auth');

app.use(cors());
app.use(express.json());

// add logging system
app.use(morgan("tiny"));

// allow every route to check if correct JWT token was sent
app.use(authorize);
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);
app.use('/companies', compRoutes);

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
// heroku test
module.exports = app;
