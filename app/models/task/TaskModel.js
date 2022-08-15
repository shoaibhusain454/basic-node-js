const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        lowercase:true,
        required: [true, "must provide title"],
        trim: true,
        maxlength:  [30, "title can't be more than 20 characters"]
    },
    desc: {
        type: String,
        lowercase:true,
        required: [true, "must provide desc"],
        trim: true,
        maxlength:  [100, "desc can't be more than 20 characters"]
    },
    completed:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task