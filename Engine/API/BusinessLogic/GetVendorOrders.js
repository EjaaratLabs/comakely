var modle = require('./Modules/Orders');
var vendorModle = require('./Modules/Users');


class GetVendorOrders {
    async input(req, message) {


        // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {

        try {
            message.VEDOR_PROFILE = await vendorModle.getVendorProfileByUserName(message.API_USER_ID)
            console.log(message.VEDOR_PROFILE.id)
            message.ORDERS = await modle.getAllOrderVendor(message.VEDOR_PROFILE.id)

        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        console.log(message.ORDERS)
        res.responseBody.orders = message.ORDERS;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetVendorOrders();
