const connection = require('../config/database');
const User = require('../models/user');

const getAllUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const createUser = async (email, name, city) => {
  await User.create({
    email,
    name,
    city,
  });
};

const updateUser = async (id, email, name, city) => {
  await User.updateOne(
    { _id: id },
    {
      email,
      name,
      city,
    }
  );
};

const deleteUser = async (id) => {
  await User.deleteOne({ _id: id });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
