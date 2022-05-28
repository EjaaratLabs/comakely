var modle = require('./Modules/ads');

class GetAd {
    async input(req, message) {


        message.ADD_TYPE = req.query.adType ?req.query.adType: "";
        // message.CENTER_ID=req.body.centerId??"";


    }
    async process(message) {

        try {
            message.ADS=await modle.getAds(message.ADD_TYPE)

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.list= message.ADS
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetAd();
