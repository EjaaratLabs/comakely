var modleUser= require('./Modules/Users');
var modleAds= require('./Modules/ads');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios=require('axios');

class GetVendorDetails{
    async input(req, message) {
       
       

       // message.CHANNEL_NAME = req.body.channelName?? "";
                message.VENDOR_ID=req.params.id
    }
    async process(message) {
       
        try {

           message.VENDOR_PROFILE=await modleUser.getVendorDetails( message.VENDOR_ID);
           message.VENDOR_REVIEW=await modleUser.getVendorReviews( message.VENDOR_ID);
           message.VENDOR_SERVICES=await modleUser.getVendorServices( message.VENDOR_ID)
       
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        res.responseBody.reviews=message.VENDOR_REVIEW;
        res.responseBody.services=message.VENDOR_SERVICES;
        res.responseBody.profile=message.VENDOR_PROFILE;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetVendorDetails();
