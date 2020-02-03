function changeFormatDate(date){
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return `${year}-${month}-${day}`
}

module.exports = { changeFormatDate }