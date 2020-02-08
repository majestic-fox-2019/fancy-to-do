const mailjet = require('node-mailjet').connect('5df205f1dcc3ded4f48ed2a3dbc2e15a', '0cf3a41bc71c7d3c2e657bde4080f0ea')

module.exports = function (to, name, text, html) {
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "arona.nur.tetulis@gmail.com",
                        "Name": "Arona"
                    },
                    "To": [
                        {
                            "Email": to,
                            "Name": name
                        }
                    ],
                    "Subject": text,
                    "TextPart": text,
                    "HTMLPart": html,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}