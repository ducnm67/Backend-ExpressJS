const getHomepage = (req, res) => {
  res.send('Hello World with Homepage !!!');
};

const getSample = (req, res) => {
  res.render('sample.ejs');
};

module.exports = {
  getHomepage,
  getSample,
};
