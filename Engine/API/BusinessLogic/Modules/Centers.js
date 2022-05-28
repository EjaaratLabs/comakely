const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Center
{
    async createNewCenter(message)
    {
    
        var results=await client.Query("insert into centers(name,address,phone,city) values(?,?,?,?)",
        [message.CENTER_NAME, message.CENTER_ADDRESS,message.CENTER_PHONE,message.CENTER_CITY]);
    }
    async getAllCenter()
    {
    
        var results=await client.Query("Select * from centers",
        []);
        return results && results.length>0?results:[];
    }
}
module.exports=new Center();