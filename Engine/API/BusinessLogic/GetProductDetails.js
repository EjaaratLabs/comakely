var modleVendor = require('./Modules/Vendor');
var modleProducts = require('./Modules/Product');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios = require('axios');

class GetProductDetails {
    async input(req, message) {

        message.PRODUCT_ID = req.query.productId

    }
    async process(message) {

        try {

            message.PRODUCT_DETAILS = await modleProducts.getProductById(message)
            message.VENDOR_DETAILS = await modleVendor.getVendorById(message.PRODUCT_DETAILS.vendorId)
            console.log(message)
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        res.responseBody.details = { productDetails: message.PRODUCT_DETAILS, vendorDetails: message.VENDOR_DETAILS }

        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetProductDetails();
