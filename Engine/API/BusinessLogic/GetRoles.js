var modle= require('./Modules/Roles');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios=require('axios');

class GetRoles{
    async input(req, message) {
       
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {
            message.ROLES=await modle.getAllRoles();
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.roles=message.ROLES;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetRoles();
