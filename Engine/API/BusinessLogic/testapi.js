
class testapi
{
    async input(req,message)
    {
           // message.NAME=req.body.name;  
            //message.NAME=req.query.name;  
            message.NAME=message.API_USER_ID;     
    }
    async process(message)
    {
        message.NAME=message.NAME+" Ashar Ali";
    }
    async output(res,message)
    {
        res.responseBody.loopBackName=message.NAME;
        res.status="Success";
    }
    inputValidation(req)
    {

    }
    
}
module.exports= new testapi();
