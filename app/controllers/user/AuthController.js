const { UserModel } = require("../../models/index")
const { apiResponse, asyncWrapper } = require("../../helper/index")
const { sign } = require("jsonwebtoken")
const { compareSync } = require("bcrypt")
const { createCustomeError } = require("../../error/CustomeError")

// const crypto = require("crypto")



exports.userSignUp = [
    asyncWrapper(async (req, res, next) => {
        req.body.role = "ADMIN";
        const user = new UserModel(req.body);
        const result = await user.save();
        return apiResponse.succesInsertData(res, `Successfully Signup`)
    })
]


exports.userSignIn = [
    asyncWrapper(async (req, res, next) => {
        const { email, password } = req.body;


        if(!email || !password)  return next(createCustomeError(`Please provide email id or password!`, 422));
        let isExists = await UserModel.findOne({ email: email, is_deleted: false, role: "USER" });
        if (!isExists) return next(createCustomeError(`Email Not Found!`, 404));
        if (!isExists.is_active) return next(createCustomeError(`User account has been deactivated, Please Contact with Admin`, 404));
        let passwordIsvalid = compareSync(password, isExists.password)
        if (!passwordIsvalid) return next(createCustomeError(`Invalid Password!`, 404))
        let token = sign({ id: isExists._id, name: isExists.fullname, email: isExists.email }, "test", { expiresIn: "10 hours" })
        let data = {
            token: token,
            fullname: isExists.fullname,
            email: isExists.email,
            role: isExists.role
        }
        return apiResponse.succesReponseWithData(res, `Login Successfully`, data)

    })
]

// exports.ForgotPassword = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()
//             let isExists = await dbo.collection("users").findOne({ email: req.body.email, is_deleted: false, role: "USER" });

//             if (!isExists) return apiResponse.notFoundReponse(res, `Email Not Found`);

//             if (!isExists.is_active) return apiResponse.notFoundReponse(res, `User account has been deactivated, Please Contact with Admin`);

//             resestPasswordToken = crypto.randomBytes(20).toString('hex')
//             resetPasswordExpire = Date.now() + 3600000

//             await dbo.collection("users").updateOne({ email: req.body.email }, {
//                 $set: {
//                     reset_password_token: resestPasswordToken,
//                     reset_password_expires: resetPasswordExpire
//                 }
//             })

//             let link = "http://localhost:3000/reset-password/" + resestPasswordToken

//             let html = mailer.getHTMLMailBody("emailTemplate/reset-password.html", link);

//             mailer.sendmail("ankit.clarigoinfotech@gmail.com", req.body.email, "Reset password ", html)
//             return apiResponse.succesReponse(res, `A verification link has been sent to your email account`)

//         } catch (error) {
//             return apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]

// exports.ResetPassword = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()
//             let isExists = await dbo.collection("users").findOne({ reset_password_token: req.body.reset_password_token, reset_password_expires: { $gt: Date.now() } });

//             if (!isExists) return apiResponse.notFoundReponse(res, `The token is invalid or has expired`);

//             const salt = bcrypt.genSaltSync(saltRound);
//             let new_password = bcrypt.hashSync(req.body.password, salt);

//             let addModel = {
//                 password: new_password,
//                 reset_password_token: "",
//                 reset_password_expires: ""
//             }

//             await dbo.collection("users").updateOne({ email: isExists.email }, { $set: addModel })


//             return apiResponse.succesReponse(res, `Your password ahs been updated`)

//         } catch (error) {
//             return apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]