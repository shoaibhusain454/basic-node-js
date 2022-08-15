const { CustomeAPIError } = require('../error/CustomeError')

const errorHandlerMiddleware = (err, req, res, next) => {
  
    if (err instanceof CustomeAPIError) {
        return res.status(err.statusCode).json({ err: err.message })
    }
    else{
        return res.status(500).json({ err: err.message })
    }
       
    // return res.status(500).json({ err: `Somthing went wrong, please try again later` })
}

module.exports = errorHandlerMiddleware