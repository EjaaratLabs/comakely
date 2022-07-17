var modle = require('./Modules/Orders');

class PostStatusUpdate {
    async input(req, message) {


        message.ORDER_ID = req.body.orderId ? req.body.orderId : "";
        // message.CENTER_ID=req.body.centerId??"";
        message.ORDER_STATUS = req.body.status ? req.body.status : "";


    }
    async process(message) {

        try {

            await modle.updateOrderStatus(message)

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Order status updated successfully."
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostStatusUpdate();
