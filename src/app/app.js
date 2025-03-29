const express = require('express');
const morgan = require('morgan');
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());


//Routes

const farmRouter = require('../routes/farmRouter');

app.use('/api/v1/farms', farmRouter);


module.exports = app;