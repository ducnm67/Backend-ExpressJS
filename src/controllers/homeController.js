const connection = require('../config/database');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
} = require('../services/CRUDService');

const getHomepage = async (req, res) => {
  let result = await getAllUsers();
  return res.render('home.ejs', { listUsers: result });
};

const getSamplePage = (req, res) => {
  return res.render('sample.ejs');
};

const getCreatePage = (req, res) => {
  return res.render('create.ejs');
};

const getUpdatePage = async (req, res) => {
  let userId = req.params.id;
  let user = await getUserById(userId);
  return res.render('edit.ejs', { user: user });
};

const postCreateUser = async (req, res) => {
  let { email, name, city } = req.body;
  await createUser(email, name, city);
  res.redirect('/');
};

const postUpdateUser = async (req, res) => {
  let { id, email, name, city } = req.body;
  await updateUser(id, email, name, city);
  res.redirect('/');
};

module.exports = {
  getHomepage,
  getSamplePage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
};
