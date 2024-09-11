const Customer = require('../models/customer');
const aqp = require('api-query-params')

const createCustomerService = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      description: customerData.description,
      image: customerData.image,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

const createArrayCustomerService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.error('>>> error: ', error);
    return null;
  }
};

const getCustomersService = async (limit, page, queryString) => {
  try {
    let result = null;
    
    if (limit && page) {
      let skip = (page - 1) * limit;
      const {filter} = aqp(queryString)
      delete filter.page
      result = await Customer.find(filter).skip(skip).limit(limit).exec();
    } else {
      result = await Customer.find({});
    }

    return result;
  } catch (error) {
    console.error('>>> error: ', error);
    return null;
  }
};

const putUpdateCustomerService = async (
  id,
  name,
  address,
  phone,
  email,
  description
) => {
  try {
    let result = await Customer.updateOne(
      { _id: id },
      {
        name,
        address,
        phone,
        email,
        description,
      }
    );
    return result;
  } catch (error) {
    console.error('>>> error: ', error);
    return null;
  }
};

const deleteACustomerService = async (id) => {
  try {
    let result = await Customer.deleteById({ _id: id });
    return result;
  } catch (error) {
    console.error('>>> error: ', error);
    return null;
  }
};

const deleteCustomersService = async (arr) => {
  try {
    let result = await Customer.delete({ _id: { $in: arr } });
    return result;
  } catch (error) {
    console.error('>>> error: ', error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getCustomersService,
  putUpdateCustomerService,
  deleteACustomerService,
  deleteCustomersService,
};
