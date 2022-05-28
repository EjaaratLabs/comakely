const dbmgr = require('../../../custom_modules/dbInstance');
var client = dbmgr.getDbClient();

class Donors {

    async createNewDonorProfile(message) {

        var results = await client.Query(`
             INSERT INTO donors(regid, name, phone, cnic, email,
             whatsapp,dob,gender,careof,city,region,district,tehsil,
             town, zone, uc, createdby, status) 
             VALUES 
             (
                ?,?,?,?,?,
                ?,?,?,?,?,?,?,?,
                ?,?,?,?,?
             )`,
            [message.REG_ID, message.NAME, message.PHONE, message.CNIC, message.EMAIL,
            message.WHATSAPP, message.DOB, message.GENDER, message.CARE_OF, message.CITY, message.REGION, message.DISTRICT, message.TEHSIL,
            message.TOWN, message.ZONE, message.UC, message.API_USER_ID, "1"
            ]);
    }
    async getAllDonorProfiles() {

        var results = await client.Query("select * from donors",
            []);
        return results && results.length > 0 ? results : [];
    }

    async getLinkedChildren(params){
       
        var results = await client.Query("select children.* from children inner join donor_children_link on donor_children_link.childid=children.regid where donor_children_link.donorid=?",
        [params.DONOR_ID]);
            return results && results.length > 0 ? results : [];
    }
    async getDonorProfiles(message) {

        var results = await client.Query("select * from donors where regid=?",
            [message.DONOR_ID ]);
        return results && results.length > 0 ? results[0] : null;
    }
}
module.exports = new Donors();