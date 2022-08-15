const { getSingleUser , deleteSingleUser, updateSingleUser} = require("../../controllers/user/UserController");


module.exports = (app) => {
    app.get("/api/user/getsingleuser/:userId", getSingleUser);
    app.patch("/api/user/updatesingleuser/:userId", updateSingleUser);
    app.delete("/api/user/deletesingleuser/:userId", deleteSingleUser);
}