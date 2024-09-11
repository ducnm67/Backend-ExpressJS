const Task = require("../models/task")

module.exports = {
    createTaskService: async (data) => {
        try {
            let {name, description, status, startDate,  endDate} = data
            let result = await Task.create(
            {
                name,
                description,
                status,
                startDate,
                endDate
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },

    getTaskService : async (data) => {
        try {
            let {page, limit} = data
            let skip = (page - 1) * limit;
            result = await Task.find().skip(skip).limit(limit).exec();
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    updateTaskService : async (data) => {
        try {
            let result = await Task.updateOne(
                { _id: data.id },
                { $set: data }
            )
            return result;
        } catch (error) {
            console.log(error);
            return null
        }
    },

    deleteTaskService : async (data) => {
        try {
            let result = await Task.deleteById({ _id: data.id })
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
 
}