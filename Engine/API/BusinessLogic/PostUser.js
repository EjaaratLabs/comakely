var modle = require('./Modules/Users');
var sha256 = require('js-sha256');

class PostUser {
    async input(req, message) {


        message.USER_NAME = req.body.userName ?req.body.userName: "";
        message.PASSWORD = req.body.password ?req.body.password: "";
        message.CENTER_ID=req.body.centerId?req.body.centerId:"1";
        message.PHONE = req.body.phone ?req.body.phone: "";
        message.EMAIL = req.body.email ?req.body.email: "";
        message.ADDRESS = req.body.address ?req.body.address: "";
        message.NAME= req.body.name ?req.body.name: "";
        message.ROLE_ID= req.body.roleId ?req.body.roleId: "1";
        message.CHANNEL_ID= req.body.channelId ?req.body.channelId: "6";
        message.USER_TYPE= req.body.userType ?req.body.userType: "";
    }
    async process(message) {

        try {
            let toHash = message.USER_NAME + message.PASSWORD;
            let result = sha256.create();
            result.update(toHash);
            result.hex();
            message.PASSWORD = result.toString().substr(0,50);
            console.log("PASSWORD: " + message.PASSWORD);
            await modle.createNewUser(message);
            console.log("not my problem\n");

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "User created successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostUser();
