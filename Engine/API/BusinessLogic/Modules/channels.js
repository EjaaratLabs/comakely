const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class channels
{
    async createNewChannel(message)
    {
    
        var results=await client.Query("insert into channels(channelname) values(?)",
        [message.CHANNEL_NAME]);
    }
    async getAllChannel()
    {
    
        var results=await client.Query("Select * from channels",
        []);
        return results && results.length>0?results:[];
    }
}
module.exports=new channels();