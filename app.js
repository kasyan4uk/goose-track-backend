const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config();

// підключення swagger документації 
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const userRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const taskRouter = require('./routes/api/tasks');
const reviewRouter = require('./routes/api/reviews');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// підключення swagger документації 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);
app.use('/reviews', reviewRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
})

module.exports = app
