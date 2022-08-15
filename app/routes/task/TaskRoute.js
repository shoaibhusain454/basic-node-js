const { createTask } = require("../../controllers/task/TaskController");


module.exports = (app) => {
    app.post("/api/task", createTask);
    // app.patch("/api/user/updatesingleuser/:userId", updateSingleUser);
    // app.delete("/api/user/deletesingleuser/:userId", deleteSingleUser);
}