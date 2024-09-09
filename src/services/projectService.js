const Project = require("../models/project")
const aqp = require('api-query-params')

const createProjectService = async (data) => {
    try {
        if (data.type === "EMPTY-PROJECT") {
            let result = Project.create(data)
            return result;
        }
        if (data.type === "ADD-USERS") {
            let project =  await Project.findById(data.projectId)

            console.log(">>> project: ", project)

            for (let i = 0; i < data.usersArr.length; i++) {
                project.usersInfor.push(data.usersArr[i])
            }

            let result = await project.save()
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getProjectService = async (queryString) => {
    try {
        let page = queryString.page
        const {filter, limit, population} = aqp(queryString)
        let skip = (page - 1) * limit;
        delete filter.page
        result = await Project.find(filter).populate(population).skip(skip).limit(limit).exec();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createProjectService,
    getProjectService
}