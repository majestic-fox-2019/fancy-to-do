"use strict"

const axios = require('axios')

class purgomalumController {
    static getText(req, res, next) {
        axios
            .get(`https://www.purgomalum.com/service/containsprofanity?text=${req.params.text}`)
            .then((respon) => {
                res.status(200).json(respon.data)
            }).catch((err) => {
                next(err)
            });
    }
}

module.exports = purgomalumController