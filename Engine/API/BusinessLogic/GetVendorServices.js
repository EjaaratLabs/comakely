var modleVendor= require('./Modules/Vendor');
var modleServices = require('./Modules/Services');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios = require('axios');

class GetVendorServices {
    async input(req, message) {

        
    }
    async process(message) {

        try {
            var vendor = await modleVendor.getVendorByUserId(message);
            message.VENDOR_ID = vendor.id;
            message.VENDOR_SERVICES = await modleServices.getVendorServices(message)
           

        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        res.responseBody.services = message.VENDOR_SERVICES;
     
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetVendorServices();
