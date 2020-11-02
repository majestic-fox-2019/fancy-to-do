function errMessageMaker(err){
    let obj = {}
    for(let i=0;i<err.errors.length;i++){
        obj[err.errors[i].path]= err.errors[i].message;
    }
    return obj
}
module.exports = errMessageMaker;