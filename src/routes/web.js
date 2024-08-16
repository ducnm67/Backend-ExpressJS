const express = require('express');
const {
  getHomepage,
  getSample,
  postCreateUser,
} = require('../controllers/homeController');
const routes = express.Router();

routes.get('/', getHomepage);

routes.get('/sample', getSample);

routes.post('/create-user', postCreateUser);

module.exports = routes;
