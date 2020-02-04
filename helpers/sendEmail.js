function sendEmail(email, title, description) {
	const mailgun = require("mailgun-js");
	const DOMAIN = "sandbox4b075d0fafc44a6596f512870426fb11.mailgun.org";
	const mg = mailgun({apiKey: "06e4fde6244794f67392ccdf4f47666f-f8faf5ef-f593ffe4", domain: DOMAIN});
	const data = {
		from: "Mailgun Sandbox <postmaster@sandbox4b075d0fafc44a6596f512870426fb11.mailgun.org>",
		to: `${email}`,
		subject: `You have created Todo List ${title}`,
		text: `${description}`
	};
	mg.messages().send(data, function (error, body) {
		console.log(body);
	});
}


module.exports = sendEmail;
