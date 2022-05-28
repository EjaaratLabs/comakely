var modle = require('./Modules/Vendor');

class PostVendorProfile {
    async input(req, message) {


        message.ORG_NAME = req.body.orgName ?req.body.orgName: "";
        message.ORG_PHONE = req.body.orgPhone ?req.body.orgPhone: "";
        message.ORG_ADDRESS = req.body.orgAddress ?req.body.orgAddress: "";

    }
    async process(message) {

        try {
            await modle.createNewVendor(message);

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Vendor profile updated successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostVendorProfile();
