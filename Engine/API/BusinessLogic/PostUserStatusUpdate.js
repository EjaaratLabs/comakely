var modle = require('./Modules//Users');

class PostUserStatusUpdate {
    async input(req, message) {


        message.USER_STATUS = req.body.status ?req.body.status: "";
        // message.CENTER_ID=req.body.centerId??"";
        message.USER_ID= req.body.userName ?req.body.userName: "";

    }
    async process(message) {

        try {
            await modle.updatetUserStatus(message)

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "User status updated successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostUserStatusUpdate();
