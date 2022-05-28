var modle = require('./Modules/Centers');

class PostCenter {
    async input(req, message) {


        message.CENTER_NAME = req.body.centerName ?req.body.centerName: "";
        // message.CENTER_ID=req.body.centerId??"";
        message.CENTER_PHONE = req.body.centerPhone ?req.body.centerPhone: "";
        message.CENTER_ADDRESS = req.body.centerAddress ?req.body.centerAddress: "";
        message.CENTER_CITY = req.body.centerCity ?req.body.centerCity: "";
    }
    async process(message) {

        try {
            await modle.createNewCenter(message);

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Center created successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostCenter();
