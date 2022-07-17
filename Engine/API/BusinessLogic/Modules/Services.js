const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Services
{
    async createNewService(message)
    {
    
        var results=await client.Query("insert into vendorservices(serviceid,vendorid) values(?,?)",
        [message.SERVICE_ID, message.VENDOR_ID]);
    }
    async getVendorServices(message)
    {
    
        var results=await client.Query("select * from vendorservices inner join services on services.id=vendorservices.serviceid where vendorservices.vendorid=? ",
        [message.VENDOR_ID]);
        return results && results.length>0? results:null
    }
  
}
module.exports=new Services();