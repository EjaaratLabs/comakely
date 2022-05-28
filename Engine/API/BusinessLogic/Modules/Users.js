const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class users
{
    async createNewUser(message)
    {
    
        var results=await client.Query("insert into users(UserName,Name,Password,Email,Phone,Address,Status,ChannelId,RoleId,CenterId,createdby,updateby,usertype) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [message.USER_NAME,message.NAME,message.PASSWORD,message.EMAIL,message.PHONE,message.ADDRESS,"0",message.CHANNEL_ID,message.ROLE_ID,message.CENTER_ID,message.API_USER_ID,message.API_USER_ID,message.USER_TYPE]);
    }
    async getAllUsers()
    {
    
        var results=await client.Query("Select users.* , centers.name as centername,accounttype.type as accounttype from users inner join centers on users.CenterId=centers.id inner join accounttype on accounttype.id=users.usertype where users.status='1'",
        []);
        return results && results.length>0?results:[];
    }
    async getUserRequests()
    {
    
        var results=await client.Query("Select users.* , centers.name as centername,accounttype.type as accounttype from users inner join centers on users.CenterId=centers.id inner join accounttype on accounttype.id=users.usertype where users.status='0'",
        []);
        return results && results.length>0?results:[];
    }
    async updatetUserStatus(message)
    {
    
        var results=await client.Query("update users set status=? where UserName=?",
        [message.USER_STATUS,message.USER_ID]);
        return results && results.length>0?results:[];
    }
    async getVendorDetails(id)
    {
    
        var results=await client.Query("Select users.*,ratings.rating from users inner join ratings on ratings.userid=users.UserName  where UserName=?",
        [id]);
        return results && results.length>0?results[0]:null;
    }
    async getVendorReviews(id)
    {
    
        var results=await client.Query("Select * from reviews  where vendorid=?",
        [id]);
        return results && results.length>0?results:[];
    }
    async getVendorServices(id)
    {
    
        var results=await client.Query("Select * from services  where vendorid=?",
        [id]);
        return results && results.length>0?results:[];
    }
    async getAllVendors()
    {
    
        var results=await client.Query("Select users.* from users  where usertype='1'",
        []);
        return results && results.length>0?results:[];
    }
    async getUserbyUserName(userId)
    {
    
        var results=await client.Query("Select users.*,centers.name as centername,channels.Abbr as channelAbbr from users inner join centers on users.CenterId=centers.id inner join channels on users.channelId=channels.channelId where UserName=?",
        [userId]);
        return results && results.length>0?results[0]:null;
    }
    async updateUserPassword(message)
    {
    
        var results=await client.Query("update users set Password=? where UserName=? ",
        [message.PASSWORD, message.API_USER_ID ,message.OLD_PASSWORD]);
    }
    async updateUserDetails()
    {
        var results=await client.Query("update users set Name=?, Phone=?, Email=?, Address=?, RoleId=?, CenterId=? where UserName=?" , 
        [message.NAME, message.PHONE, message.EMAIL, message.ADDRESS, message.ROLE_ID, message.CENTER_ID, message.API_USER_ID]);
    }
    async getUserInfoByUserName(userId)
    {
    
        var results=await client.Query("Select * from users where UserName=?",
        [userId]);
        return results && results.length>0?results[0]:null;
    }
    async getUserInfoByUserName(userId)
    {
    
        var results=await client.Query("Select * from users where UserName=?",
        [userId]);
        return results && results.length>0?results[0]:null;
    }
    async getUserInfoByUserName(userId)
    {
    
        var results=await client.Query("Select * from users where UserName=?",
        [userId]);
        return results && results.length>0?results[0]:null;
    }
    async getUserProductsByUserName(userId)
    {
    
        var results=await client.Query("Select * from vendorproducts where vendorId=?",
        [userId]);
        return results && results.length>0?results[0]:null;
    }
    async getUserProductsByUserName(userId)
    {
    
        var results=await client.Query("Select * from vendorproducts where vendorId=?",
        [userId]);
        return results && results.length>0?results[0]:null;
    }
    async getVendorProfileByUserName(userId)
    {
    
        var results=await client.Query("Select * from vendorprofiles where userid=?",
        [userId]);
        return results && results.length>0?results[0]:null;
    }
}
module.exports=new users();