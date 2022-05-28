const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Vendor
{
    async createNewVendor(message)
    {
    
        var results=await client.Query("insert into vendorprofiles(orgname,phone,officeaddress,userid) values(?,?,?,?)",
        [message.ORG_NAME, message.ORG_PHONE,message.ORG_ADDRESS,message.API_USER_ID]);
    }
    async updateVendor(message)
    {
    
        var results=await client.Query("update table vendorprofiles set orgname=?,phone=?,officeaddress=? where userid=?",
        [message.ORG_NAME, message.ORG_PHONE,message.ORG_ADDRESS,message.API_USER_ID]);
        return results && results.length>0?results:[];
    }
}
module.exports=new Vendor();