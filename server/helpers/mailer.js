"use strict"
const nodemailer = require('nodemailer');

function mailSend(email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "dummy100211@gmail.com",
            pass: process.env.PASSWORD
        }
    })

    let mailOptions = {
        from: "dummy100211@gmail.com",
        to: email,
        subject: 'My Todo',
        text: `Pemberitahuan Anda Sedang Login Di My Todo`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log((info.message))
        }
    })
}
module.exports = mailSend