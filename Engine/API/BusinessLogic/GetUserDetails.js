var modle= require('./Modules/Users');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios=require('axios');
const { model } = require('mongoose');

class GetUserDetails{
    async input(req, message) {
       
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {

            message.USER_INFO=await modle.getUserInfoByUserName(message.API_USER_ID);
            message.USER_PRODUCTS=await modle.getUserProductsByUserName(message.API_USER_ID);
            if( message.USER_INFO.usertype==1)
            {
                message.VEDOR_PROFILE=await modle.getVendorProfileByUserName(message.API_USER_ID)
            }
           
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        res.responseBody.info= message.USER_INFO;
        res.responseBody.products= message.USER_PRODUCTS;
        res.responseBody.vendorProfile= message.VEDOR_PROFILE;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetUserDetails();
