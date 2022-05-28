var modle = require('./Modules/Donors');
var sysConfig = require('./Modules/SystemConfigurations');

class PostChildProfile {
    async input(req, message) {


        message.NAME = req.body.name ? req.body.name : "";
        message.PHONE = req.body.phone ? req.body.phone : "";
        message.CNIC = req.body.cnic ? req.body.cnic : "";
        message.EMAIL = req.body.email ? req.body.email : "";
        message.WHATSAPP = req.body.whatsapp ? req.body.whatsapp : "";
        message.DOB = req.body.dob ? req.body.dob : "";
        message.GENDER = req.body.gender ? req.body.gender : "";
        message.CARE_OF = req.body.careOf ? req.body.careOf : "";
        message.CITY = req.body.city ? req.body.city : "";
        message.REGION = req.body.region ? req.body.region : "";
        message.DISTRICT = req.body.district ? req.body.district : "";
        message.TEHSIL = req.body.tehsil ? req.body.tehsil : "";
        message.TOWN = req.body.town ? req.body.town : "";
        message.ZONE = req.body.zone ? req.body.zone : "";
        message.UC = req.body.uc ? req.body.uc : "";

    }
    async process(message) {

        try {

            message.REG_ID = await sysConfig.getNextSeqValue("donor_reg_id")
            await modle.createNewDonorProfile(message);

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Donor Profile created successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostChildProfile();
