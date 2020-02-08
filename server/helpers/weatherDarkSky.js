const axios = require('axios')

const getWeather = (date) => {
    let dateTime = new Date(date).getTime()
    let str = String(dateTime)
    let time = str.slice(0, str.length-3)
    const latitudeLatitude = `-6.2598,106.7792,${time}`
    return axios({
        method: 'get',
        url: 'https://api.darksky.net/forecast/'+process.env.API_KEY_DrakSky+'/'+latitudeLatitude+'?lang=id'
    })
}
module.exports = {getWeather}