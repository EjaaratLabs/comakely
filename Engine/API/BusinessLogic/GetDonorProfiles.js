var modle = require('./Modules/Donors');


class GetDonorProfiles {
    input(req, message) {


        // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {

        try {
            message.PROFILES = await modle.getAllDonorProfiles()
            console.log( message.PROFILES)
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    output(res, message) {
        res.responseBody.list = message.PROFILES;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetDonorProfiles();
