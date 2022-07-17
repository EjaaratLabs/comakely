var modle = require('./Modules/Vendor');
var prodmodle = require('./Modules/Product');

class PostVendorProduct {
    async input(req, message) {


        message.NAME = req.body.name ? req.body.name : "";
        message.DESCRIPTION = req.body.description ? req.body.description : "";
        message.CATEGORY = req.body.category ? req.body.category : "";
        message.PRICE = req.body.price ? req.body.price : "";
        message.IS_PRIMARY = req.body.isPrimary ? req.body.isPrimary : "";

    }
    async process(message) {

        try {
            var vendor = await modle.getVendorByUserId(message);
            message.VENDOR_ID = vendor.id;
            if (message.IS_PRIMARY && message.IS_PRIMARY == '1') { 
                console.log("Hi Hello")
                await prodmodle.resetProductPrimary(message); }
            await prodmodle.createNewProduct(message);

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Vendor product added successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostVendorProduct();
