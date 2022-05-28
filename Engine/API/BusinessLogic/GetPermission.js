var modle = require('./Modules/Permissions');


class GetPermission {
    async input(req, message) {
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {
            message.PERMISSIONS=await modle.getAllPermissions();
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.permissions=message.PERMISSIONS;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetPermission();
