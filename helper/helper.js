class Helper {

    static errorFormatter(object){
        let error = {}

        for(let i = 0; i < object.length; i++){
            let key = object[i].path
            error[key] = object[i].message
        }

        return error
    }

}

module.exports = Helper