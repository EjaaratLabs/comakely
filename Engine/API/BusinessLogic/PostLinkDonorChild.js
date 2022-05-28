var modle = require('./Modules/Children');

class PostLinkDonorChild {
    async input(req, message) {


        message.DONOR_ID = req.body.donorId ?req.body.donorId: "";
        // message.CENTER_ID=req.body.centerId??"";
        message.CHILD_ID = req.body.childId ?req.body.childId: "";

    }
    async process(message) {

        try {
            await modle.linkChildDonor(message);

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Profile linked successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostLinkDonorChild();
