var modle = require('./Modules/Vendor');
var msgmodle = require('./Modules/Messages');

class PostSendMessageToVendor {
    async input(req, message) {

        message.VENDOR_ID = req.body.vendorId ? req.body.vendorId : "";
        message.MESSAGE = req.body.message ? req.body.message : "";
    }
    async process(message) {

        try {
            console.log('##########################')
            console.log(message.VENDOR_ID)
            var vendor = await modle.getVendorById(message.VENDOR_ID);
            message.VENDOR_USER = vendor.userid;
            message.VENDOR_EMAIL = vendor.vendorEmail;
            console.log(message.VENDOR_EMAIL)
            await msgmodle.createNewMessage(message.MESSAGE, message.API_USER_ID, message.VENDOR_USER)
            var msg = `
            Dear Member,
            Following message has been recieved from ${message.API_USER_ID}.

            ${message.MESSAGE}

            Regards
            `
            await msgmodle.sendEmailNotification(message.VENDOR_EMAIL, "Message Recieved", msg)
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        res.responseBody.message = "Message sent successfull."
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostSendMessageToVendor();
