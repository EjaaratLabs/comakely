const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Dashboard
{
 
    async getTotalCollectionByArea()
    {
    
        var results=await client.Query("select sum(donation_details.amount) as amount,areas.name as areaname from donation_details inner join areas on donation_details.areaId=areas.id group by donation_details.areaId",
        []);
        return results && results.length>0?results:[];
    }
    async getTotalCollectionByMethod()
    {
    
        var results=await client.Query("select sum(donations.amount) as amount,donation_methods.method as method from donations inner join donation_methods on donations.methodid=donation_methods.id group by donations.methodid",
        []);
        return results && results.length>0?results:[];
    }
    async getTotalCollectionByCenter()
    {
    
        var results=await client.Query("select sum(donations.amount) as amount,centers.name as centername from donations inner join centers on donations.centerid=centers.id group by donations.centerid",
        []);
        return results && results.length>0?results:[];
    }
}
module.exports=new Dashboard();