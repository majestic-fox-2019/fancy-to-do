if (process.env.NODE_ENV == 'development'){
    require('dotenv').config()
}

function sentEmail(email, title, description, due_date){
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.API_KEY);
    const titleUC = title.toUpperCase()
    const descriptionUC = description.toUpperCase()
    const msg = {
        to: `${email}`,
        from: `fajrinpgrm@gmail.com`,
        subject: 'Fancy Todos -- Success add Todos',
        text: `Successfuly added ${title} with description ${description} and the due date is ${due_date} to your todo list. Thankyou:)`,
        html: `<strong>Successfuly added todos ${titleUC} with description ${descriptionUC} and the due date is ${due_date} to your todo list. Thankyou:)</strong>`,
    };
    sgMail.send(msg);
}

module.exports = sentEmail