const { hash } = require("bcrypt")
const mongoose = require("mongoose")
const saltRound = 8;

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        lowercase:true,
        required: [true, "must provide first name"],
        trim: true,
        maxlength:  [30, "first name can't be more than 20 characters"]
    },
    last_name: {
        type: String,
        lowercase:true,
        required:  [true, "must provide last name"],
        trim: true,
        maxlength:  [30, "last name can't be more than 20 characters"]
    },
    email: {
        type: String,
        lowercase:true,
        required:   [true, "must provide email"],
        unique: true,
        trim: true,
        maxlength:  [40, "email can't be more than 20 characters"]
    },
    password: {
        type: String,
        required:   [true, "must provide password"],
        trim: true,
        maxlength:  [40, "password can't be more than 40 characters"],
        minlength: [5, "password must be more than 7 characters"],
    },
    dob: {
        type: Date
        // required:  [true, "must provide dob"]
    },
    role: {
        type: String,
        uppercase:true,
        default: "USER",
        trim: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    reset_password_token:{
        type:String,
        default:""
    },
    reset_password_expires:{
        type:String,
        default:""
    },
    profile_pic: {
        type: String,
        default: ""
    },
    posts: {
        type: Array,
        default: []
    },
    tokens: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});


userSchema.pre('save', async function (next){
const user = this
if(user.isModified('password')){
    user.password = await hash(user.password,saltRound)
}
user.role = "USER"
next();
})



const User = mongoose.model("User", userSchema)

module.exports = User