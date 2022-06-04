var modle = require('./Modules/blogs');

class PostBlog {
    async input(req, message) {


        message.TITLE = req.body.title ?req.body.title: "";
        message.DESCRIPTION = req.body.description ?req.body.description: "";
        message.BRIEF = req.body.brief ?req.body.brief: "";
    }
    async process(message) {

        try {
            await modle.createNewBlog(message)

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Blog created successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostBlog();
