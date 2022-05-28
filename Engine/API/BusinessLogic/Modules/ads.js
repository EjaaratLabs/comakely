const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Ads
{
    async createNewAd(message)
    {
    
        var results=await client.Query("insert into ads(title,description,createdby,adtype,weight,size,quantity,category,color) values(?,?,?,?,?,?,?,?,?)",
        [message.TITLE, message.DESCRIPTION,message.API_USER_ID,message.ADD_TYPE,message.WEIGHT,message.SIZE,message.QTY,message.CATEGORY,message.COLOR]);
    }
    async getAds(adType)
    {
    
        var results=await client.Query("Select * from ads where adtype=?",
        [adType]);
        return results && results.length>0?results:[];
    }
    async getAdDetails(id)
    {
    
        var results=await client.Query("Select * from ads where id=?",
        [id]);
        return results && results.length>0?results[0]:null;
    }
}
module.exports=new Ads();