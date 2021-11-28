'use strict';
// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
// const serverless = require('serverless-http')


// Import routes
const agendamentoRouter = require('./routes/agendamento-route')
const userRouter = require('./routes/user-route')

// Set default port for express app
const PORT = 8080;
const HOST = '0.0.0.0';

// Create express app
const app = express()

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Implement agendamento route
app.use('/agendamento', agendamentoRouter)
app.use('/user', userRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// Start express app
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`);

// module.exports = app;
// module.exports.handler = serverless(app);