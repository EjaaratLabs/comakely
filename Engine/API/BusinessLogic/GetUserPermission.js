var modle = require('./Modules/Permissions');


class GetUserPermission {
    async input(req, message) {
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {
            var result=await modle.getUserPermissions(message);
            var list=[];
            result.forEach((val)=>{
                list.push(val["PermissionId"])
            })
           message.PERMISSIONS=list;
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.permissions=message.PERMISSIONS;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetUserPermission();
