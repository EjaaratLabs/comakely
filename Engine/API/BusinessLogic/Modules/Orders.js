const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class Orders
{
    async createNewOrder(message)
    {
    
        var results=await client.Query("insert into vendororders(status,quantity,comments,buyeruserId,productId) values(?,?,?,?,?)",
        ['1',message.ORDER_QTY,message.ORDER_COMMENT,message.BUYER_USER_ID,message.PRODUCT_ID]);
    }
    async getAllOrderVendor(id)
    {
    
        var results=await client.Query("Select *,orderstatus.statusname as orderStatus,orderstatus.id as orderStatusId,vendorproducts.id as productId from vendororders inner join vendorproducts on vendororders.productId=vendorproducts.id inner join orderstatus on orderstatus.id=vendororders.status where vendorproducts.vendorId=?",
        [id]);
        return results && results.length>0?results:[];
    }
    async updateOrderStatus(message)
    {
    
        var results=await client.Query("update vendororders set status=? where  id=?",
        [message.ORDER_STATUS,message.ORDER_ID]);
    }
}
module.exports=new Orders();