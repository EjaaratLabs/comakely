var modle = require('./Modules/Donors');


class GetDonorDetails {
    input(req, message) {
       

        message.DONOR_ID = req.query.donorId?? null;
console.log(  message.DONOR_ID)
    }
    async process(message) {
       
        try {

            message.DETAILS=await modle.getDonorProfiles(message)
            message.CHILDS=await modle.getLinkedChildren(message)
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    output(res, message) {
        res.responseBody.details=message.DETAILS;
        res.responseBody.children=message.CHILDS;
        console.log( res.responseBody)
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetDonorDetails();
