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
    async getVendorByUserId(message)
    {
    
        var results=await client.Query("select * from vendorprofiles where userid=?",
        [message.API_USER_ID]);
        return results && results.length>0? results[0]:null
    }
    async getVendorById(id)
    {
    
        var results=await client.Query("select *,users.name as vendorName,users.Email as vendorEmail,vendorprofiles.id as vendorId from vendorprofiles inner join users on users.UserName=vendorprofiles.userid where vendorprofiles.id=?",
        [id]);
        return results && results.length>0? results[0]:null
    }
}
module.exports=new Vendor();