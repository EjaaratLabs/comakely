const dbmgr = require('../../../custom_modules/dbInstance');
var client = dbmgr.getDbClient();

class Children {

    async createNewChildProfile(message) {

        var results = await client.Query(`INSERT INTO children(name, dob, gender, regid, is_disable, have_siblings,
             sisters,brothers, specialskills, aimoflife, presentaddress, city, region, district, tehsil, town, zone,
             uc, fathername, fathercnic, fatherdd, fatherrod, fatheroccupation, fatherdesignation, 
             mothername, mothercnic, motherdd, motherrod, motheroccupation, motherdesignation, 
             mothereducation, motherphone, mothermobile, motherpresentadd, motherpermanentadd,createdby,status) VALUES 
             (
                ?,?,?,?,?,?,
                ?,?,?,?,?,?,?,?,?,?,?,
                ?,?,?,?,?,?,?,
                ?,?,?,?,?,?,
                ?,?,?,?,?,?,?
             )`,
            [message.NAME, message.DOB, message.GENDER, message.REG_ID, message.IS_DISABLE, message.HAVE_SIBLINGS,
            message.SISTERS, message.BROTHERS, message.SPECIAL_SKILLS, message.AIM, message.PRESENT_ADDRESS, message.CITY, message.REGION, message.DISTRICT, message.TEHSIL, message.TOWN, message.ZONE,
            message.UC, message.FATHER_NAME, message.FATHER_CNIC, message.FATHER_DD, message.FATHER_ROD, message.FATHER_OCCUPATION, message.FATHER_DESIGNATION,
            message.MOTHER_NAME, message.MOTHER_CNIC, message.MOTHER_DD, message.MOTHER_ROD, message.MOTHER_OCCUPATION, message.MOTHER_DESIGNATION,
            message.MOTHER_EDUCATION, message.MOTHER_PHONE, message.MOTHER_MOBILE, message.MOTHER_PRESENT_ADDRESS, message.MOTHER_PERMANENT_ADDRESS, message.API_USER_ID, "1"
            ]);
    }
    async createNewChildGurdianProfile(message) {

        var results = await client.Query(`INSERT INTO student_gurdian(studentid,name,phone, 
        relationwithchild,occupation, designation, education, mobile, other_rel,bankname,
         branch_code, account_no,account_title, address, is_active, createdby) VALUES
         (
            ?,?,?,
            ?,?,?,?,?,?,?,
            ?,?,?,?,?,?
         )`,
            [
                message.REG_ID, message.GURDIAN_NAME, message.GURDIAN_PHONE,
                message.GURDIAN_RELATION, message.GURDIAN_OCCUPATION, message.GURDIAN_DESIGNATION, message.GURDIAN_EDUCATION, message.GURDIAN_MOBILE, "", message.GURDIAN_BANK_NAME,
                message.GURDIAN_BRANCH_CODE, message.GURDIAN_ACCOUNT_NO, message.GURDIAN_ACCOUNT_TITLE, message.GURDIAN_ADDRESS, "1", message.API_USER_ID
            ]);
    }

    async createNewChildInstituteProfile(message) {

        var results = await client.Query(`INSERT INTO students_institutions( studentid, session, 
        admissiondate, admissionno, class, fee, name, medium,phone, principalname, 
        principalphone, principal_employee, address, createdby, is_active, 
        bank_name,branch_code, account_no, account_title, bank_address) VALUES
         (
            ?,?,
            ?,?,?,?,?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,? 
         )`,
            [
                message.REG_ID, message.SCH_SESSION,
                message.SCH_ADMISSION_DATE, message.SCH_ADMISSION_NO, message.SCH_CLASS, message.SCH_FEE, message.SCH_NAME, message.SCH_MEDIUM, message.SCH_PHONE, message.SCH_PRINCIPAL_NAME,
                message.SCH_PRINCIPAL_PHONE, message.SCH_PRINCIPAL_TYPE, message.SCH_ADDRESS, message.API_USER_ID, "1",
                message.SCH_BANK_NAME, message.SCH_BRANCH_CODE, message.SCH_ACCOUNT_NO, message.SCH_ACCOUNT_TITLE, message.SCH_BANK_ADDRESS
            ]);
    }

    async getAllChildProfiles(params) {

        var results = await client.Query("Select children.*,si.session as instsession,si.class as instclass,si.fee as instfee,si.admissiondate as instaddate, si.admissionno instadno, si.name as instname, si.medium as instmedium,si.phone as instphone, si.principalname as instprincipalname, si.principalphone as instprincipalphone, si.principal_employee as instprincipaltype,si.address as instaddress,si.bank_name as instbankname, si.branch_code as instbranchcode , si.account_no as instaccountno, si.account_title as instaccounttile, si.bank_address as instbankaddress,sg.name as gurdianname,sg.phone as gurdianphone,sg.relationwithchild as gurdianrelation, sg.occupation as gurdianoccupation, sg.designation as gurdiandesignation, sg.education as gurdianeducation, sg.mobile as gurdianmobile , sg.bankname as gurdianbankname, sg.branch_code as gurdianbranchcode, sg.account_no as gurdianaccountno, sg.account_title gurdianaccounttitle, sg.address as gurdianaddress from children inner join students_institutions si on si.studentid=children.regid inner join student_gurdian sg on sg.studentid=children.regid where ( ? is NULL or children.islinked=?)",
            [params.IS_LINKED, params.IS_LINKED]);
        return results && results.length > 0 ? results : [];
    }
    async linkChildDonor(message) {

        var results = await client.Query(`INSERT INTO donor_children_link(donorid,childid) VALUES
         (
            ?,?
         )`,
            [
                message.DONOR_ID, message.CHILD_ID
            ]);
        var results1 = await client.Query(`update children set islinked=1 where regid=?`,
            [
                message.CHILD_ID
            ]);
    }
    async deLinkChildDonor(message) {

        var results = await client.Query(`delete from donor_children_link where donorid=? and childid=?`,
            [
                message.DONOR_ID, message.CHILD_ID
            ]);
        var results1 = await client.Query(`update children set islinked=0 where regid=?`,
            [
                message.CHILD_ID
            ]);
    }
    async updateChildProfile(message) {


    }


}
module.exports = new Children();