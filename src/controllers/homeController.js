const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../services/CRUDService');

/**
 * Hiển thị trang chủ với danh sách người dùng
 */
const getHomepage = async (req, res, next) => {
  try {
    const result = await getAllUsers();
    return res.render('home.ejs', { listUsers: result });
  } catch (error) {
    return next(error);
  }
};

/**
 * Hiển thị trang sample
 */
const getSamplePage = (req, res) => {
  return res.render('sample.ejs');
};

/**
 * Hiển thị trang tạo mới người dùng
 */
const getCreatePage = (req, res) => {
  return res.render('create.ejs');
};

/**
 * Hiển thị trang cập nhật người dùng
 */
const getUpdatePage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      // Nếu không tìm thấy user, trả về trang lỗi 404
      return res.status(404).render('404.ejs', { message: 'User not found' });
    }
    return res.render('edit.ejs', { user });
  } catch (error) {
    return next(error);
  }
};

/**
 * Xử lý tạo người dùng mới
 */
const postCreateUser = async (req, res, next) => {
  try {
    const { email, name, city } = req.body;
    await createUser(email, name, city);
    return res.redirect('/');
  } catch (error) {
    return next(error);
  }
};

/**
 * Xử lý cập nhật người dùng
 */
const postUpdateUser = async (req, res, next) => {
  try {
    const { id, email, name, city } = req.body;
    await updateUser(id, email, name, city);
    return res.redirect('/');
  } catch (error) {
    return next(error);
  }
};

/**
 * Hiển thị trang xóa người dùng (xác nhận trước khi xóa)
 */
const postDeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).render('404.ejs', { message: 'User not found' });
    }
    return res.render('delete.ejs', { user });
  } catch (error) {
    return next(error);
  }
};

/**
 * Xử lý xóa người dùng (destroy)
 */
const postDestroyUser = async (req, res, next) => {
  try {
    const id = req.body.id;
    await deleteUser(id);
    return res.redirect('/');
  } catch (error) {
    return next(error);
  }
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
