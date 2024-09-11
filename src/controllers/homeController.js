// const connection = require('../config/database');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
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
  let id = req.params.id;
  let user = await getUserById(id);
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

const postDeleteUser = async (req, res) => {
  let id = req.params.id;
  let user = await getUserById(id);
  return res.render('delete.ejs', { user: user });
};

const postDestroyUser = async (req, res) => {
  let id = req.body.id;
  await deleteUser(id);
  res.redirect('/');
};

module.exports = {
  getHomepage,
  getSamplePage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postDestroyUser,
};
