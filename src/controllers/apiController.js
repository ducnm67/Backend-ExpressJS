const User = require('../models/user');

const getUsersAPI = async (req, res) => {
  let result = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const postCreateUserAPI = async (req, res) => {
  let { email, name, city } = req.body;
  let user = await User.create({
    email,
    name,
    city,
  });
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let { id, email, name, city } = req.body;
  let user = await User.updateOne(
    { _id: id },
    {
      email,
      name,
      city,
    }
  );
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  let id = req.body.id;
  let result = await User.deleteOne({ _id: id });
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
};
