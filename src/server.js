require('dotenv').config();
const express = require('express');

const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const connection = require('./config/database');

const app = express();

// Set up environment variables
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config template engine
configViewEngine(app);

//config routes
app.use('/', webRouter);

//run app
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
