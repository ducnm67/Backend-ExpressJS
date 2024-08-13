require('dotenv').config();
const express = require('express');

const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const mysql = require('mysql2');

const app = express();

// Set up environment variables
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;

//config template engine
configViewEngine(app);

//config routes
app.use('/', webRouter);

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '123456',
  database: 'hoidanit',
});

connection.query('select * from Users;', function (err, results, fields) {
  console.log('>>>results= ', results); // results contains rows returned by server
  console.log('>>>fields= ', fields); // fields contains extra meta data about results, if available
});

//run app
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
