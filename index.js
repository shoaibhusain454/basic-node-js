require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require("./app/db/mongoose")
const bodyParser = require("body-parser")
const cors = require('cors');
const rateLimit = require("express-rate-limit")
const fileUpload = require("express-fileupload")
const PORT = process.env.PORT || 3000;
const dbURL = process.env.dbURL;

const morgan = require("morgan");
const helmet = require("helmet");
const {notFound, errorHandler} = require("./app/middlewar");


// const swaggerJSdoc = require("swagger-jsdoc");

// const swaggerOption = {
//     swaggerDefinition: {
//         info:{
//         title:"Get API"
//         }
//     },
//     apis:["index.js"]
// }


// const swaggerDocs = swaggerJSdocs(swaggerOption)
// app.use("/api-docs", )

/*======================================================
for log req or req data
======================================================*/
app.use(morgan('dev'));


/*======================================================
for file upload
======================================================*/
app.use(fileUpload({
    limits: {
        fileSize: 1024 * 1024 // 1 MB
    },
    abortOnLimit: true
}));


/*======================================================
static path for public folder   
========================================================*/
const path = require("path")
app.use(express.static(path.join(__dirname, 'public')));


/*======================================================
for restrict any frontend users other than we declare 
========================================================*/
var corsOptions = {
    origin: ["http://localhost:4200", "http://localhost:4300"]
}
app.use(cors(corsOptions));


/*======================================================
Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
========================================================*/
app.use(helmet());


/*======================================================
            to limit user requests 
========================================================*/
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)



app.use(express.json());
app.use(function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization,multipart/form-data');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

require("./app/routes")(app)

app.get("/", (req, res) => {
    res.status(200).send("<h1>Hello Shoaib Husain!</h1>")
})

app.use(notFound);
app.use(errorHandler);


// app.all("*", (req,res)=>{
//     res.status(404).send("No page found!")
// })

const start = async () => {
    try {
        await connectDB(dbURL);
        app.listen(PORT,()=>{ console.log(`Server is working ${PORT}`) });

    } catch (error) {
        console.log("error " + error.message)
    }
}

start();

