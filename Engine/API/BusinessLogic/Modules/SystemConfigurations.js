const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class SystemConfigurations
{
    async getSystemParamValue(param)
    {
    
        var results=await client.Query("select value from system_configurations where Param=?",
        [param]);
        return results && results.length>0?results[0]["value"]:null;
    }
    async getNextSeqValue(key)
    {  
        var results=await client.Query("update countersequence set value=last_insert_id(value+1) where name=?",
        [key]);
        results=await client.Query("select last_insert_id(value) as val from countersequence where name=?",
        [key]);
        return results && results.length>0?results[0]["val"]:null;
    }
}
module.exports=new SystemConfigurations();