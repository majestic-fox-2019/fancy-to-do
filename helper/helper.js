class Helper {

    static errorFormatter(object){
        let error = {}

        for(let i = 0; i < object.length; i++){
            error[object[i].path] = object[i].message
        }

        return error
    }

}

module.exports = Helper