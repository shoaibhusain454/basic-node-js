const mongoose = require('mongoose');
const dbURL = 'mongodb://127.0.0.1:27017/test'

// mongoose.connect(dbURL, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
//     // useCreateIndex:true,
//     // useFindAndModify:false
// }).then(() => {
//     console.log("Database connected successfully. ")
// }).catch((err) => {
//     console.log("err", err.message)
// })

const connectDB = async (dbURL) => {
    return  mongoose.connect(dbURL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
            // useCreateIndex:true,
            // useFindAndModify:false
        })
}

module.exports = connectDB;