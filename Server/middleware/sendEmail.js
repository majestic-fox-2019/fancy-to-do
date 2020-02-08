const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = function(email,username){
    let msg = {
        to: `${email}`,
        from: 'bangunforgame@gmail.com',
        subject: 'Pendaftaran Berhasil',
        text: `Selamat,akun ${username} berhasil didaftarkan di fancy ToDo List `
        // html: '<p>Hello HTML world!</p>',
      }
    
    sgMail
  .send(msg)
  .then(() => {
    console.log('berhasil')
  })
  .catch(error => {

    console.error(error.toString());

  });
     
}