const connection = require('../config/database');

const getAllUsers = async () => {
  let [result, fields] = await connection.query('SELECT * FROM Users');
  return result;
};

const getUserById = async (id) => {
  let [result, fields] = await connection.query(
    'SELECT * FROM Users where id = ?',
    [id]
  );
  return (user = result && result.length > 0 ? result[0] : {});
};

const createUser = async (email, name, city) => {
  let [result, fields] = await connection.query(
    `INSERT INTO Users (email, name, city)  VALUES (?,?,?)`,
    [email, name, city]
  );
};

const updateUser = async (id, email, name, city) => {
  let [result, fields] = await connection.query(
    `
        UPDATE Users
        SET email = ?, name = ?, city = ?
        WHERE id = ?
        `,
    [email, name, city, id]
  );
};

module.exports = { getAllUsers, getUserById, createUser, updateUser };
