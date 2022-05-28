var tokenization=require('../../custom_modules/tokenization');
const dbmgr=require('../../custom_modules/dbInstance');
var sha256 = require('js-sha256');

class logintoken
{
    async input(req,message)
    {  
        message.USER_NAME = req.body.f8996da763b7a969b1;   
        message.PASSWORD = req.body.d74ff0ee8da3b9806b;
               
        console.log("HELLO USERNAME", message.USER_NAME);
        console.log("HELLO PASSWORD", message.PASSWORD);
    }
    async process(message)
    { 
        //decryptdata here
        let toHash = message.USER_NAME + message.PASSWORD;
        let result = sha256.create();
        result.update(toHash);
        result.hex();
        message.PASSWORD = result.toString().substr(0,50);
        console.log(message.PASSWORD)
        //user name pass validation logic
        
        message.STATUS="UnAuthorized";
        var client=dbmgr.getDbClient();
        var results=await client.Query("select * from users where UserName=? and Password=? and channelId=6 and status='1'",[message.USER_NAME,message.PASSWORD]);
       
        if(results&&results.length>0)
        {
            message.STATUS="Success";
            message.DATA=results[0];
            message.RESOURCE_TOKEN=tokenization.generateUserToken(message.USER_NAME);
        }
        else
        {
            message.ERROR_MESSAGE="Invalid User Name Password Provided";
        }
       
    }
    async output(res,message)
    {
        res.responseBody.token=message.RESOURCE_TOKEN;
        res.responseBody.data=message.DATA;
        res.status=message.STATUS;
        res.responseBody.errorMessage=message.ERROR_MESSAGE;
    }
    inputValidation(req)
    {

    }
    
}
module.exports= new logintoken();
