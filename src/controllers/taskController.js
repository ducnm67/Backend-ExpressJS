const {
    createTaskService, getTaskService,
    updateTaskService, deleteTaskService
} = require("../services/taskService")

module.exports = {
    getTaskAPI : async (req, res) => {
        let task = await getTaskService(req.query)
        
        return res.status(200).json({
            errorCode: 0,
            data: task
        })
    },

    postCreateTaskAPI : async (req, res) => {
        let task = await createTaskService(req.body)
        
        return res.status(200).json({
            errorCode: 0,
            data: task
        })
    },

    putUpdateTaskAPI : async (req, res) => {
        let task = await updateTaskService(req.body)
        
        return res.status(200).json({
            errorCode: 0,
            data: task
        })
    },

    deleteATaskAPI : async (req, res) => {
        let task = await deleteTaskService(req.body)
        
        return res.status(200).json({
            errorCode: 0,
            data: task
        })
    }
}