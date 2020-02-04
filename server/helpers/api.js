// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(email, description) {
  const msg = {
        to: `${email}`,
        from: 'marcell.maruli021@gmail.com',
        subject: `TODO LIST ANNOUNCEMENT!`,
        text: `${description}`,
        html: `<strong>${description}</strong>`,
      };
      return msg
} 

module.exports = sendEmail
