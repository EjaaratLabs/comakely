var modleVendor= require('./Modules/Vendor');
var modleProducts = require('./Modules/Product');
var systemConfig = require('./Modules/SystemConfigurations');
var Axios = require('axios');

class GetVendorProducts {
    async input(req, message) {

        
    }
    async process(message) {

        try {

            message.VENDOR_PRODUCTS = await modleProducts.getAllProducts(message)
           

        }
        catch (ex) {
            console.log(ex);
        }
    }
    async output(res, message) {
        res.responseBody.products = message.VENDOR_PRODUCTS;
     
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetVendorProducts();
