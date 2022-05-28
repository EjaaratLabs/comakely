var channels = require('./Modules/channels');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios=require('axios');
var logger = require('../../custom_modules/logger');
class PostChannel {
    async input(req, message) {
       

        message.CHANNEL_NAME = req.body.channelName?req.body.channelName: "";

    }
    async process(message) {
       
        try {
            await channels.createNewChannel(message);
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Channel created successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostChannel();
