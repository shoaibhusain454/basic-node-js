const { userSignUp, userSignIn } = require("../../controllers/user/AuthController")
// const { check, validationResult } = require('express-validator');
// const { validateR } = require("../../helper/index")

module.exports = (app) => {
    app.post("/api/user/signup", userSignUp);
    app.post("/api/user/signin", userSignIn);

    // app.post("/api/user/forgot-password", [
    //     check('email').not().notEmpty().withMessage('email is required').isEmail().withMessage('not an email'),
    // ], validateR.validate, userAutController.ForgotPassword)

    // app.post("/api/user/reset-password", [
    //     check('password').not().notEmpty().withMessage('password is required')
    // ], validateR.validate, userAutController.ResetPassword)
}