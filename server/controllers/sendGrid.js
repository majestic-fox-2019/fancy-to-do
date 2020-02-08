const sgMail = require('@sendgrid/mail');

class SendGridController {

    static memberInvited(req, res, next) {
        sgMail.setApiKey(process.env.SEND_GRID_KEY);
        const msg = {
        to: req.body.email,
        from: 'lie.projects.20@gmail.com',
        subject: 'You Have Been Invited to a Project!',
        html: `<strong>You have been invited to ${req.body.project}  Project by ${req.loggedUser.email}!</strong>
        <br>
        <p><a href="#">Click here</a> to check the project</p>
        `,
        };
        sgMail.send(msg);
        res.status(200).json('Mail Sent')
    }
}

module.exports = SendGridController