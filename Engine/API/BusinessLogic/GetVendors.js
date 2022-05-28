var modle= require('./Modules/Users');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios=require('axios');

class GetUsers{
    async input(req, message) {
       
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {
            message.USERS=await modle.getAllVendors()
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.users=message.USERS;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetUsers();
