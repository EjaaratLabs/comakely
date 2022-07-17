var modle = require('./Modules/Orders');

class PostNewOrder {
    async input(req, message) {


        message.PRODUCT_ID = req.body.prodId ? req.body.prodId : "";
        // message.CENTER_ID=req.body.centerId??"";
        message.ORDER_QTY = req.body.qty ? req.body.qty : "";
        message.ORDER_COMMENT = req.body.comments ? req.body.comments : "";

    }
    async process(message) {

        try {
            message.BUYER_USER_ID = message.API_USER_ID;
            await modle.createNewOrder(message)

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Order submitted successfully."
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostNewOrder();
