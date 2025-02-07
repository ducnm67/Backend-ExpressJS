require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');

const configViewEngine = require('./config/viewEngine');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');
const connection = require('./config/database');

const app = express();

// Set up environment variables
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config template engine
configViewEngine(app);

//config routes
app.use('/', webRouter);
app.use('/v1/api/', apiRouter);

//run app
(async () => {
  try {
    //test connection
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log('>>> Error connection DB: ', err);
  }
})();
