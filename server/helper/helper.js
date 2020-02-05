const bcrypt = require('bcryptjs')
const axios = require('axios')

const createError = (err) => {
    const temp = []
    err.errors.forEach(error => {
        temp.push(error.message)
    })

    return { message: temp }
}

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const comparePassword = (plain, encrypted) => {
    return bcrypt.compareSync(plain, encrypted)
}

const getHolidays = () => {
    return axios({
        method: 'get',
        url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.API_KEY_CALENDAR}&country=ID&year=2020`
    })
}

module.exports = { createError, encryptPassword, comparePassword, getHolidays }