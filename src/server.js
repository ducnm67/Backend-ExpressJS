require('dotenv').config();
const express = require('express');

const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');

const app = express();

// Set up environment variables
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;

//config template engine
configViewEngine(app);

//config routes
app.use('/', webRouter);

//run app
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
