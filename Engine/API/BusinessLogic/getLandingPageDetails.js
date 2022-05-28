var modle = require('./Modules/Roles');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios = require('axios');
const DigitalMarketing = require('./Modules/DigitalMarketing');

class getLandingPageDetails {
    async input(req, message) {
        message.TARGET = req.query.target;
    }
    async process(message) {

        const { TARGET } = message;

        try {
            message.ALLPOSTS = await DigitalMarketing.getLandingPagePost(TARGET);
            message.ALLSLIDERS = await DigitalMarketing.getLandingPageSlider(TARGET);

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.posts = message.ALLPOSTS;
        res.responseBody.sliders = message.ALLSLIDERS;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new getLandingPageDetails();
