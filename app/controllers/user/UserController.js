const { UserModel } = require("../../models/index");
const { apiResponse, asyncWrapper } = require("../../helper/index");
const { createCustomeError } = require("./../../error/CustomeError");


// exports.getAllUser = [
//     asyncWrapper (async (req, res, next) => {
//             const { name, sort, fields } = req.query;

//             const queryObject ={};
//             (name) ? queryObject.name = { $regex:name, $options:'i' }:"";

//             const userDetail = await UserModel.findOne({ _id: userId }, { first_name: 1, last_name: 1, email: 1, dob: 1, role: 1 })
//             if(!userDetail){
//                 return next(createCustomeError(`No user with user id : ${userId}`, 404))
//             }
//             return apiResponse.succesReponseWithData(res, `User details get successfully`, userDetail)
//     })
// ]

exports.getSingleUser = [
    asyncWrapper (async (req, res, next) => {
            const { userId } = req.params;
            const userDetail = await UserModel.findOne({ _id: userId }, { first_name: 1, last_name: 1, email: 1, dob: 1, role: 1 })
            if(!userDetail){
                return next(createCustomeError(`No user with user id : ${userId}`, 404))
            }
            return apiResponse.succesReponseWithData(res, `User details get successfully`, userDetail)
    })
]

exports.updateSingleUser = [
    asyncWrapper (async (req, res, next) => {
            const { userId } = req.params;
            const updates = Object.keys(req.body);

            const allowedUpdates =  [ 'first_name', 'last_name', 'dob']
            const isValidOprations =  updates.every((update)=> allowedUpdates.includes(update));

            if(!isValidOprations){
                return next(createCustomeError(`Invalid Updates!`, 400))
            }



            const userDetail = await UserModel.findByIdAndUpdate({ _id: userId }, req.body, { new:true, runValidators:true })
            // const userDetail = await UserModel.findById({ _id: userId });
           
            // updates.forEach((update)=> userDetail[update] = req.body[update] );
           
            // await userDetail.save();

            if(!userDetail){
                return next(createCustomeError(`No user with user id : ${userId}`, 404))
            }
            return apiResponse.succesReponseWithData(res, `User updated successfully`, userDetail)
            // return apiResponse.succesReponse(res, `User updated successfully`)
    })
]

exports.deleteSingleUser = [
    asyncWrapper(async (req, res, next) => {
            const { userId } = req.params;
            const userDetail = await UserModel.deleteOne({ _id: userId })
            if(!userDetail){
                return next(createCustomeError(`No user with user id : ${userId}`, 404))
                // return apiResponse.notFoundReponse(res,  `No user with user id : ${userId}`)
            }
    })
]

// exports.UpdateUser = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()

//             let isExist = await dbo.collection("users").findOne({ email: req.body.email })


//             if (isExist && ObjectId(isExist._id).toString() != req.userId) return apiResponse.notFoundReponse(res, `Email already in use`)

//             let addModel = new UserModel(req.body);
//             let date = new Date()
//             let userDetail = {
//                 updated_at: new Date()
//             };

//             (addModel.fullname) ? userDetail.fullname = addModel.fullname: '';
//             (addModel.email) ? userDetail.email = addModel.email: '';
//             (addModel.description) ? userDetail.description = addModel.description: '';


//             if (req.files) {
//                 let file = req.files.profile_pic;



//                 const extensionName = path.extname(file.name); // fetch the file extension
//                 const allowedExtension = ['.png', '.jpg', '.jpeg'];

//                 if (!allowedExtension.includes(extensionName)) return apiResponse.invalideImage(res, `Invalid Image`)


//                 var filename = 'profile' + utility.randomString() + '.' + file.name.split('.').pop();

//                 userDetail.profile_pic = 'profile_pic/' + filename;
//                 const dir = 'public/assets/images/profile_pic/';
//                 if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }

//                 file.mv('public/assets/images/profile_pic/' + filename, async function(err) {
//                     if (err) { console.log("Error 1 :" + err); }
//                 });

//                 if (isExist.profile_pic != '') {
//                     fs.unlinkSync('public/assets/images/' + isExist.profile_pic);
//                 }

//             }

//             let result = await dbo.collection("users").updateOne({ _id: ObjectId(req.userId) }, { $set: userDetail })

//             if (!result) return apiResponse.notFoundReponse(res, `No data updated`)
//             apiResponse.succesReponse(res, `User updated`)

//         } catch (error) {
//             console.log(error)
//             apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]

// exports.deleteUserTemporary = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()
//             mailer.sendmail("ankit.clarigoinfotech@gmail.com", "ankittest@yopmail.com", "Test", "Your Account is temporary deleted")
//             let User = new UserModel();
//             let userDetail = {
//                 is_deleted: true
//             };

//             let result = await dbo.collection("users").updateOne({ _id: ObjectId(req.userId) }, { $set: userDetail })
//             if (!result) return apiResponse.notFoundReponse(res, `User not deleted`)
//             apiResponse.succesReponse(res, `User temporary deleted`)
//         } catch (error) {
//             apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]

// exports.deleteUserPermanent = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()
//             let result = await dbo.collection("users").deleteOne({ _id: ObjectId(req.userId) })
//             if (!result) return apiResponse.notFoundReponse(res, `User not deleted`)
//             apiResponse.succesReponse(res, `User permanently deleted`)
//         } catch (error) {
//             apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]

// exports.changeIsActive = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()
//             let user = await dbo.collection("users").findOne({ _id: ObjectId(req.userId) }, { projection: { is_active: 1 } });
//             let status = !user.is_active
//             let userDetail = {
//                 is_active: status
//             };
//             let result = await dbo.collection("users").updateOne({ _id: ObjectId(req.userId) }, { $set: userDetail })
//             if (!result) return apiResponse.notFoundReponse(res, `User status not updated`)
//             if (!status) return apiResponse.succesReponse(res, `User is deactivated`)
//             apiResponse.succesReponse(res, `User is activated`)

//         } catch (error) {
//             apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]


// exports.changePasword = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()
//             let isExists = await dbo.collection("users").findOne({ _id: ObjectId(req.userId) });
//             let passwordIsvalid = bcrypt.compareSync(
//                 req.body.oldPassword, isExists.password
//             )
//             if (!passwordIsvalid) return apiResponse.notFoundReponse(res, `Invalid Old Password`);
//             req.body.newPassword = bcrypt.hashSync(req.body.newPassword, saltRound)
//             let User = new UserModel();
//             let userDetail = {
//                 password: req.body.newPassword
//             };
//             let result = await dbo.collection("users").updateOne({ _id: ObjectId(req.userId) }, { $set: userDetail })
//             if (!result) return apiResponse.notFoundReponse(res, `Something went wrong when update password`)
//             apiResponse.succesReponse(res, `Password updated successfully`)
//         } catch (error) {
//             apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]

// exports.updatePost = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()

//             if (req.files) {
//                 let filesArray = req.files.post;
//                 const postArray = [];

//                 if (Array.isArray(filesArray)) {

//                     filesArray.forEach((file) => {

//                         const extensionName = path.extname(file.name); // fetch the file extension
//                         const allowedExtension = ['.png', '.jpg', '.jpeg'];

//                         if (!allowedExtension.includes(extensionName)) return apiResponse.invalideImage(res, `Invalid Image`)
//                         var filename = 'post' + utility.randomString() + '.' + file.name.split('.').pop();
//                         const dir = 'public/assets/images/post/';
//                         if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }

//                         file.mv('public/assets/images/post/' + filename, async function(err) {
//                             if (err) { console.log("Error 1 :" + err); }
//                         });
//                         postArray.push('post/' + filename)
//                     })
//                     let isExist = await dbo.collection("users").findOne({ _id: ObjectId(req.userId) })
//                     if (isExist.post.length > 0) {
//                         isExist.post.forEach((file) => {
//                             fs.unlinkSync('public/assets/images/' + file);
//                         })
//                     }
//                     let result = await dbo.collection("users").updateOne({ _id: ObjectId(req.userId) }, { $set: { post: postArray } })
//                 } else {

//                     const extensionName = path.extname(filesArray.name); // fetch the file extension
//                     const allowedExtension = ['.png', '.jpg', '.jpeg'];

//                     if (!allowedExtension.includes(extensionName)) return apiResponse.invalideImage(res, `Invalid Image`)
//                     var filename = 'post' + utility.randomString() + '.' + filesArray.name.split('.').pop();
//                     const dir = 'public/assets/images/post/';
//                     if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }

//                     filesArray.mv('public/assets/images/post/' + filename, async function(err) {
//                         if (err) { console.log("Error 1 :" + err); }
//                     });
//                     postArray.push('post/' + filename)
//                     let isExist = await dbo.collection("users").findOne({ _id: ObjectId(req.userId) })
//                     if (isExist.post.length > 0) {
//                         isExist.post.forEach((file) => {
//                             fs.unlinkSync('public/assets/images/' + file);
//                         })
//                     }
//                     let result = await dbo.collection("users").updateOne({ _id: ObjectId(req.userId) }, { $set: { post: postArray } })
//                 }


//                 // if (!result) return apiResponse.notFoundReponse(res, `Post not updated`)
//                 return apiResponse.succesReponse(res, `Post updated`)

//             }
//             return apiResponse.notFoundReponse(res, `No data found for Post Update`) // if no image sent



//         } catch (error) {
//             console.log(error)
//             apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]

// exports.AddAddress = [
//     async(req, res) => {
//         try {
//             const con = await connection.getConnection();
//             const dbo = con.db()
//             req.body.user_id = req.userId;
//             let addModel = new AddressModel(req.body);
//             const result = await dbo.collection("addresses").insertOne(addModel);
//             return apiResponse.succesReponse(res, `Successfully saved Address!`)

//         } catch (error) {
//             return apiResponse.errorReponse(res, error.message)
//         }
//     }
// ]