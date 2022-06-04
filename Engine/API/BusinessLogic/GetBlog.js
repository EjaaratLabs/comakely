var modle = require('./Modules/blogs');


class GetBlog {
    async input(req, message) {
       

       // message.CHANNEL_NAME = req.body.channelName?? "";

    }
    async process(message) {
       
        try {

            message.BLOGS=await modle.getAllBlogs()
           // messsage.CENTERS[0].name=hfdhgd;
           
        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.blogs=message.BLOGS;
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new GetBlog();
