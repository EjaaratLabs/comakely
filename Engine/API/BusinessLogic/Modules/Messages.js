const dbmgr = require('../../../custom_modules/dbInstance');
var client = dbmgr.getDbClient();
var nodemailer = require("nodemailer");

class Messages {
    async createNewMessage(message, send, to) {

        var results = await client.Query("insert into messagecenter(senderuser,recvuser,message) values(?,?,?)",
            [send, to, message]);
    }
    async sendEmailNotification(to, subject, message) {
        try {
            var transporter = nodemailer.createTransport({
                host: 'comakely.com',
                port: 465,
                //  secure: true, // use SSL
                auth: {
                    user: "no-reply@comakely.com", //'alkhidmat@ejaarat.com',
                    pass: "comakely12345" //'{[eimzDAO}#c'
                }
            });
            const mailOptions = {
                from: "no-reply@comakely.com",
                to: to,
                subject: subject,
                text: message
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                }
                //  response.json({done: true});
            });
        }
        catch (e) {

        }
    }


}
module.exports = new Messages();