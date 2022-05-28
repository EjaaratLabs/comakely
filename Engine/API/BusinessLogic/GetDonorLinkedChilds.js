var modle = require('./Modules/Donors');


class GetDonorLinkedChildProfiles {
    input(req, message) {
       

        message.DONOR_ID = req.query.donorId?? null;

    }
    async process(message) {
       
        try {

            message.PROFILES=await modle.getLinkedChildren(message)

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

module.exports = new GetDonorLinkedChildProfiles();
