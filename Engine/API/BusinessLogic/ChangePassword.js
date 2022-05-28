var modle = require('./Modules/Users');
var sha256 = require('js-sha256');

class ChangePassword {
    async input(req, message) {


        message.OLD_PASSWORD= req.body.oldPassword ?req.body.oldPassword: "";
        message.PASSWORD = req.body.password ?req.body.password: "";
    }
    async process(message) {

        try {
            
            let toHash = message.API_USER_ID + message.PASSWORD;
            let result = sha256.create();
            result.update(toHash);
            result.hex();
            message.PASSWORD = result.toString().substr(0,50);

            let oldToHash = message.API_USER_ID + message.OLD_PASSWORD;
            let oldResult = sha256.create();
            oldResult.update(oldToHash);
            oldResult.hex();
            message.OLD_PASSWORD = oldResult.toString().substr(0,50);

            var user= await modle.getUserbyUserName(message.API_USER_ID )

            if(user.Password!=message.OLD_PASSWORD)
            {
                message.RESP_MSG="Invalid old password provided.";
                message.STATUS = "UnAuthorized";
            }else if(message.OLD_PASSWORD==message.PASSWORD)
            {
                message.RESP_MSG="Old password and new password can not be same.";
                message.STATUS = "BLError";
            }
            else{
                await modle.updateUserPassword(message) 
                message.RESP_MSG="Password updated successfully.";
                message.STATUS = "Success"; 
            }
 
        }
        catch (ex) {
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

module.exports = new ChangePassword();
