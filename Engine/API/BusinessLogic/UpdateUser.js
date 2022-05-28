var modle = require('./Modules/Users');

class UpdateUser {
    async input(req, message) {

        message.CENTER_ID=req.body.centerId?req.body.centerId:"";
        message.PHONE = req.body.phone ?req.body.phone: "";
        message.EMAIL = req.body.email ?req.body.email: "";
        message.ADDRESS = req.body.address ?req.body.address: "";
        message.NAME= req.body.name ?req.body.name: "";
        message.ROLE_ID= req.body.roleId ?req.body.roleId: "";
    }
    async process(message) {

        try {

            if(message.API_USER_ID == ""){
                message.RESP_MSG = "Invalid User";
                message.STATUS = "UnAuthorized";
            }
            else if(message.CENTER_ID == ""){
                message.RESP_MSG = "Center not provided";
                message.STATUS = "BadRequest";
            }
            else if(message.PHONE == ""){
                message.RESP_MSG = "Phone not provided";
                message.STATUS = "BadRequest";

            }else if(message.EMAIL == ""){
                message.RESP_MSG = "Email not provided";
                message.STATUS = "BadRequest";

            }else if(message.ADDRESS == ""){
                message.RESP_MSG = "Address not provided";
                message.STATUS = "BadRequest";

            }else if(message.NAME == ""){
                message.RESP_MSG = "Name not provided";
                message.STATUS = "BadRequest";

            }
            else if(message.ROLE_ID == ""){
                message.RESP_MSG = "Role not provided";
                message.STATUS = "BadRequest";

            }
            else{
                await modle.updateUserDetails(message) 
                message.RESP_MSG = "Detail updated successfully.";
                message.STATUS = "Success";
            } 
 
        }
        catch (ex) {
            message.RESP_MSG = "Failed to Update";
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

module.exports = new UpdateUser();