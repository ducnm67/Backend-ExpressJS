const connection = require('../config/database');
const User = require('../models/user');

const getAllUsers = async () => {
  // Trả về Promise từ việc truy vấn tìm tất cả người dùng
  return User.find({});
};

const getUserById = async (id) => {
  // Tìm người dùng theo id
  return User.findById(id);
};

const createUser = async (email, name, city) => {
  // Tạo người dùng mới và trả về kết quả được tạo ra
  return User.create({
    email,
    name,
    city,
  });
};

const updateUser = async (id, email, name, city) => {
  // Cập nhật thông tin người dùng và trả về kết quả cập nhật
  return User.updateOne({ _id: id }, { email, name, city });
};

const deleteUser = async (id) => {
  // Xóa người dùng theo id và trả về kết quả xóa
  return User.deleteOne({ _id: id });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
