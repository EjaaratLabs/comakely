var channels = require('./Modules/channels');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios=require('axios');

class GetChannel {
    input(req, message) {
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {
            message.CHANNELS=await channels.getAllChannel();
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    output(res, message) {
        res.responseBody.channels=message.CHANNELS;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetChannel();
