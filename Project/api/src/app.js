const express = require('express');
const cors = require('cors');

//Importing Routers
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');
const studentRouter = require('./routes/studentRoutes');

//Creating App
const app = new express();

//Using middlewares
app.use(cors());
app.use(express.json());

//Registering routes
const urlPrefix = process.env.URL_PREFIX;
app.use(urlPrefix, adminRouter);
app.use(urlPrefix, userRouter);
app.use(urlPrefix, studentRouter);

//Exporitng App
module.exports = app;