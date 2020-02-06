const sgMail = require('@sendgrid/mail');

function sendEmail(email, title, description) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: `${email}`,
		from: `Admin@SpeechGrammarList.com`,
		subject: `You have created TODO "${title}"`,
		text: `${description}`,
	};
	sgMail.send(msg);
}


module.exports = sendEmail;
