const express = require('express');
const {
  getHomepage,
  getSamplePage,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postDestroyUser,
} = require('../controllers/homeController');

const routes = express.Router();

// Các route hiển thị trang web
routes.get('/', getHomepage);
routes.get('/sample', getSamplePage);
routes.get('/create', getCreatePage);
routes.get('/update/:id', getUpdatePage);

// Các route xử lý dữ liệu người dùng
routes.post('/create-user', postCreateUser);
routes.post('/update-user', postUpdateUser);
// Route hiển thị trang xác nhận xóa (lấy thông tin user theo id)
routes.post('/delete-user/:id', postDeleteUser);
// Route thực hiện xóa người dùng
routes.post('/delete-user', postDestroyUser);

module.exports = routes;
