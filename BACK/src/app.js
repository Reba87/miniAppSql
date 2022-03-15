const express = require('express');
const app = express();
const estudentRoutes = require('./router/studentRouter')
const errorHandling = require('./error/errorHandling')

const sql = require('./database')

//CONFIG
app.set(`port`, process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended:false}))

//ROUTERS
app.use(estudentRoutes)


app.use(errorHandling)
module.exports = app;