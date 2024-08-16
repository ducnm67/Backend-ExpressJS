const connection = require('../config/database');

const getHomepage = (req, res) => {
  return res.render('home.ejs');
};

const getSample = (req, res) => {
  return res.render('sample.ejs');
};

const postCreateUser = (req, res) => {
  let { email, name, city } = req.body;

  connection.query(
    `INSERT INTO
    Users (email, name, city) 
    VALUES (?,?,?)`,
    [email, name, city],
    (err, result) => {
      console.log(result);
      res.send('Created user !!!');
    }
  );
};

module.exports = {
  getHomepage,
  getSample,
  postCreateUser,
};
