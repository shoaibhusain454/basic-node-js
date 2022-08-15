module.exports = (app) => {

    //user auth route 
    require("./user/AuthRoute")(app)
    require("./user/UserRoute")(app)

    // task
    require("./task/TaskRoute")(app)

    //search auth route 
    // require("./user/searchRoute")(app)
    // require("./user/friendRoute")(app)

    // // chat API
    // require("./user/chatRoute")(app)


    // // admin routes
    // require("./admin/adminAuthRoute")(app)
    // require("./admin/adminRoute")(app)
    // require("./admin/userManagementRoute")(app)

    
}