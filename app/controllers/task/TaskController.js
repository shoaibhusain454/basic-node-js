const { asyncWrapper, apiResponse } = require("../../helper");
const { TaskModel } = require("../../models/index")

exports.createTask = [
    asyncWrapper(async (req, res) => {
        const task = new TaskModel(req.body);
        const result = await task.save();
        return apiResponse.succesInsertData(res, `Task Created Successfully`)
    })
]


