var modle = require('./Modules/Users');
var sha256 = require('js-sha256');
var defaultPass = require('../../GlobalConfig/ConfigParams');

class ResetPassword {
    async input(req, message) {

    }
    async process(message) {

        try {

            let toHash = message.API_USER_ID + defaultPass["defaultPass"];
            let result = sha256.create();
            result.update(toHash);
            result.hex();
            message.PASSWORD = result.toString().substr(0,50);

            await modle.updateUserPassword(message) 
            message.RESP_MSG = "Password updated successfully.";
            message.STATUS = "Success"; 
 
        }
        catch (ex) {
            message.RESP_MSG = "Password Reset Failed";
            message.STATUS = "InternalServerError";
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = message.RESP_MSG;
        res.status = message.STATUS;
    }
    inputValidation(req) {

    }

}

module.exports = new ResetPassword();
