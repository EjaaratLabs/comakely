var modle = require('./Modules/Children');


class GetChildProfiles {
    input(req, message) {
       

        message.IS_LINKED = req.query.isLinked?? null;

    }
    async process(message) {
       
        try {
            message.PROFILES=await modle.getAllChildProfiles(message)
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    output(res, message) {
        res.responseBody.list=message.PROFILES;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetChildProfiles();
