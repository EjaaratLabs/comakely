const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Product
{
    async createNewProduct(message)
    {
    
        var results=await client.Query("insert into vendorproducts(title,description,price,category,isPrimary,status,vendorId) values(?,?,?,?,?,?,?)",
        [message.NAME, message.DESCRIPTION,message.PRICE,message.CATEGORY,message.IS_PRIMARY,'1',message.VENDOR_ID]);
    }
    async resetProductPrimary(message)
    {
    console.log(message.VENDOR_ID)
        var results=await client.Query("update  vendorproducts set isPrimary='0' where vendorId=?",
        [message.VENDOR_ID]);
       // return results && results.length>0?results:[];
    }
    async updateVendor(message)
    {
    
        var results=await client.Query("update table vendorprofiles set orgname=?,phone=?,officeaddress=? where userid=?",
        [message.ORG_NAME, message.ORG_PHONE,message.ORG_ADDRESS,message.API_USER_ID]);
        return results && results.length>0?results:[];
    }
    async getAllProducts(message)
    {
    
        var results=await client.Query("select * from vendorproducts ",
        [message.API_USER_ID]);
        return results && results.length>0? results:null
    }
    async getProductById(message)
    {
    
        var results=await client.Query("Select vendorproducts.*,vendorprofiles.name as profileName,vendorprofiles.orgname as orgName,vendorprofiles.id as vendorId,productcategory.category as productCategory from vendorproducts inner join vendorprofiles on vendorprofiles.id=vendorproducts.vendorId inner join productcategory on productcategory.id=vendorproducts.category where vendorproducts.id=? ",
        [message.PRODUCT_ID]);
        return results && results.length>0? results[0]:null
    }
}
module.exports=new Product();