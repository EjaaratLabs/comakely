const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class roles
{
    async createNewChannel(message)
    {
    
        var results=await client.Query("insert into channels(channelname) values(?)",
        [message.CHANNEL_NAME]);
    }
    async getAllRoles()
    {
    
        var results=await client.Query("Select * from roles",
        []);
        return results && results.length>0?results:[];
    }
}
module.exports=new roles();