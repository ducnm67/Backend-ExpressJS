const Customer = require('../models/customer');
const aqp = require('api-query-params');

const createCustomerService = (customerData) => {
  return Customer.create(customerData);
};

const createArrayCustomerService = (arr) => {
  return Customer.insertMany(arr);
};

const getCustomersService = async (limit, page, queryString) => {
  let filter = aqp(queryString).filter;
  delete filter.page;

  let query = Customer.find(filter).lean(); // lean() để tối ưu hiệu suất

  if (limit && page) {
    let skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
  }

  return query.exec();
};

const putUpdateCustomerService = (id, updateData) => {
  return Customer.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteACustomerService = (id) => {
  return Customer.findByIdAndDelete(id);
};

const deleteCustomersService = (arr) => {
  return Customer.deleteMany({ _id: { $in: arr } });
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getCustomersService,
  putUpdateCustomerService,
  deleteACustomerService,
  deleteCustomersService,
};
