var modle = require('./Modules/Vendor');
var servmodle = require('./Modules/Services');

class PostVendorServices {
    async input(req, message) {

        message.SERVICE_ID = req.body.serviceId ? req.body.serviceId : "";

    }
    async process(message) {

        try {
            var vendor = await modle.getVendorByUserId(message);
            message.VENDOR_ID = vendor.id;
            await servmodle.createNewService(message);

        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        res.responseBody.message = "Vendor service added successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostVendorServices();
