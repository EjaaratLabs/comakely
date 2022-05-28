const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Permission
{
    async getAllPermissions()
    {
    
        var results=await client.Query("Select * from permissions",
        []);
        return results && results.length>0?results:[];
    }
    async getUserPermissions(message)
    {
    
        var results=await client.Query("Select rolemappermission.PermissionId from users inner join roles on users.RoleId=roles.Roleid inner join rolemappermission on roles.RoleId=rolemappermission.RoleId where users.UserName=?",
        [message.API_USER_ID]);
        return results && results.length>0?results:[];
    }
}
module.exports=new Permission();