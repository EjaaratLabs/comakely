var modleUser= require('./Modules/Users');
var modleAds= require('./Modules/ads');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios=require('axios');

class GetAdDetails{
    async input(req, message) {
       
       

       // message.CHANNEL_NAME = req.body.channelName?? "";
                message.AD_ID=req.params.id
    }
    async process(message) {
       
        try {
           message.DETAILS=await modleAds.getAdDetails(message.AD_ID);
           message.VENDOR_PROFILE=await modleUser.getVendorDetails( message.DETAILS.createdby)
        console.log(message)
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        res.responseBody.details=message.DETAILS;
        res.responseBody.profile=message.VENDOR_PROFILE;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetAdDetails();
