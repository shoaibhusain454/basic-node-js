exports.succesReponse = (res, msg) => {
    let data = {
        status:true,
        message:msg
    }
    return res.status(200).json(data)
} 

exports.succesInsertData = (res, msg) => {
    let data = {
        status:true,
        message:msg
    }
    return res.status(201).json(data)
}

exports.succesReponseWithData = (res, msg, resdata) => {
    let data = {
        status:true,
        message:msg,
        data:resdata
    }
    return res.status(200).json(data)
} 

exports.errorReponse = (res, msg) => {
    let data = {
        status:false,
        message:msg,
    }
    return res.status(500).json(data)
} 
exports.notFoundReponse = (res, msg) => {
    let data = {
        status:false,
        message:msg,
    }
    return res.status(404).json(data)
}
exports.validationErrorWithData = (res, msg, errData) => {
    let data = {
        status:false,
        message:msg,
        data:errData
    }
    return res.status(406).json(data)
}  
exports.unauthorizedReponse = (res, msg) => {
    let data = {
        status:false,
        message:msg,
    }
    return res.status(401).json(data)
}
exports.forbiddenAccess = (res, msg )=> {
    let data = {
        status:false,
        message:msg,
    }
    return res.status(403).json(data)
}
exports.invalideImage = (res, msg) => {
    let data = {
        status:false,
        message:msg
    }
    return res.status(422).json(data)
}
