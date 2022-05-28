var modle= require('./Modules/Users');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios=require('axios');

class GetProfile{
    async input(req, message) {
       
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {
            message.USER=await modle.getUserbyUserName(message.API_USER_ID)
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.details=message.USER?{
            name:message.USER.Name,
            phone:message.USER.Phone,
            address:message.USER.Address,
            center:message.USER.centername,
            email:message.USER.Email
        }:{}
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetProfile();
