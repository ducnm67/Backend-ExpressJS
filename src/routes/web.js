const express = require('express');
const {
  getHomepage,
  getSamplePage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
} = require('../controllers/homeController');
const routes = express.Router();

routes.get('/', getHomepage);
routes.get('/sample', getSamplePage);
routes.get('/create', getCreatePage);
routes.get('/update/:id', getUpdatePage);

routes.post('/create-user', postCreateUser);
routes.post('/update-user', postUpdateUser);

module.exports = routes;
