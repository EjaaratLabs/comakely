const mysqlclient = require('mysql2');
var dbConnection = require('../GlobalConfig/mysqlDB');
class dbmysql {
    constructor(dbId = "0") {
        var db=dbConnection[dbId];
        db.waitForConnections=true;
        this.pool = mysqlclient.createPool(db);
    }
    async Query(query, binds=[]) {
        const promisePool = this.pool.promise();
        var result =await promisePool.query(query, binds);
        return result? result[0]:null;
    }
}
const dbmysqlInst=new dbmysql("0");
class dbInstance {
    getDbClient(config = { dbId :"0", db: "mysql" }) {
        if (config.db == "mysql")
            return dbmysqlInst
        else
            return null;
    }
}
const instance=new dbInstance();
module.exports = instance;