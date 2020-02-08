const axios = require('axios')

class Solat {
  static getAPISolat(req, res, next) {
    axios({
      method: "GET",
      url :"https://muslimsalat.com/jakarta/daily.json?key=55358e37828165e2c637d5cc8b51fe7b"
    })
    .then(data => {
      const cache = [];
      const string = JSON.stringify(data,  (key, value) => {
        if(typeof value === "object" && value !== null) {
          if(cache.indexOf(value) !== -1) {
            return
          }
          cache.push(value);
        }
        return value;
      })
      
      let dataobj = JSON.parse(string)
      res.status(200).json(dataobj.data)
    })
    .catch(err => {
      next(err)
    })
  }
}
module.exports = Solat