var modle = require('./Modules/ads');

class PostAd {
    async input(req, message) {


        message.ADD_TYPE = req.body.adType ?req.body.adType: "";
        // message.CENTER_ID=req.body.centerId??"";
        message.TITLE = req.body.title ?req.body.title: "";
        message.DESCRIPTION = req.body.desc ?req.body.desc: "";
        message.SIZE = req.body.size ?req.body.size: "";
        message.COLOR = req.body.color ?req.body.color: "";
        message.QTY = req.body.quantity ?req.body.quantity: "";
        message.CATEGORY = req.body.category ?req.body.category: "";
        message.WEIGHT = req.body.weight ?req.body.weight: "";
    }
    async process(message) {

        try {
            await modle.createNewAd(message);

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Ad posted successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostAd();
