const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Blog
{
    async createNewBlog(message)
    {
    
        var results=await client.Query("insert into blogs(title,description,createdby,brief) values(?,?,?,?)",
        [message.TITLE, message.DESCRIPTION,message.API_USER_ID,message.BRIEF]);
    }
    async getAllBlogs()
    {
    
        var results=await client.Query("Select * from blogs",
        []);
        return results && results.length>0?results:[];
    }
}
module.exports=new Blog();