var tokenization=require('../../custom_modules/tokenization')


class loginclienttoken
{
    async input(req,message)
    {  
             
    }
    async process(message)
    {
        message.CLIENT_TOKEN=tokenization.generateUserToken('client');
    }
    async output(res,message)
    {
        res.responseBody.token=message.CLIENT_TOKEN;
        res.status="Success";
    }
    inputValidation(req)
    {

    }
    
}
module.exports= new loginclienttoken();
