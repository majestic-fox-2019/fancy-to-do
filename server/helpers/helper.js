const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
const moment = require('moment')
if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}

exports.authSign = function(user){
  return jwt.sign(user, process.env.SECRET_KEY)
}

exports.authVerify = function(bearer){
  return jwt.verify(bearer, process.env.SECRET_KEY)
}

exports.sendMail = function(email, title, description, due_date){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let date = moment(due_date).format('dddd, DD MMMM YYYY')
  const msg = {
    to: `${email}`,
    from: `anovanurfaqih@gmail.com`,
    subject: `Todo list`,
    html: `<p>Todolist berhasil di tambahkan</p>
          <p>Due Date : ${date}</p>
          <p>Title : ${title}</p>
          <p>Description : ${description}</p>`,
  };
  sgMail.send(msg, () => {
    console.log(`Berhasil kirim ke ${msg.to}`)
  });
}