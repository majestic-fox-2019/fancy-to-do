const jwt = require('jsonwebtoken')


class Helper {

    static errorFormatter(object){
        let error = {}

        for(let i = 0; i < object.length; i++){
            error[object[i].path] = object[i].message
        }

        return error
    }

    static authData(object){
        let newObj = {}

        for(let key in object){
            if(key !== 'password'){
                newObj[key] = object[key]
            }
        }

        return newObj
    }

}

module.exports = Helper