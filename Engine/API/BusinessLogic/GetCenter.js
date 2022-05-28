var modle = require('./Modules/Centers');


class GetCenter {
    async input(req, message) {
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {

            message.CENTERS=await modle.getAllCenter();
            messsage.CENTERS[0].name=hfdhgd;
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.centers=message.CENTERS;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetCenter();
