var modle = require('./Modules/Children');
var sysConfig = require('./Modules/SystemConfigurations');

class PostChildProfile {
    async input(req, message) {


        message.NAME = req.body.NAME ? req.body.NAME : "";
        message.PHONE = req.body.PHONE ? req.body.PHONE : "";
        message.DOB = req.body.DOB ? req.body.DOB : "";
        message.GENDER = req.body.GENDER ? req.body.GENDER : "";
        message.IS_DISABLE = req.body.IS_DISABLE ? req.body.IS_DISABLE : "";
        message.HAVE_SIBLINGS = req.body.HAVE_SIBLINGS ? req.body.HAVE_SIBLINGS : "";
        message.SISTERS = req.body.SISTERS ? req.body.SISTERS : "";
        message.BROTHERS = req.body.BROTHERS ? req.body.BROTHERS : "";
        message.SPECIAL_SKILLS = req.body.SPECIAL_SKILLS ? req.body.SPECIAL_SKILLS : "";
        message.AIM = req.body.AIM ? req.body.AIM : "";
        message.PRESENT_ADDRESS = req.body.PRESENT_ADDRESS ? req.body.PRESENT_ADDRESS : "";
        message.CITY = req.body.CITY ? req.body.CITY : "";
        message.REGION = req.body.REGION ? req.body.REGION : "";
        message.DISTRICT = req.body.DISTRICT ? req.body.DISTRICT : "";
        message.TEHSIL = req.body.TEHSIL ? req.body.TEHSIL : "";
        message.TOWN = req.body.TOWN ? req.body.TOWN : "";
        message.ZONE = req.body.ZONE ? req.body.ZONE : "";
        message.UC = req.body.UC ? req.body.UC : "";
        message.FATHER_NAME = req.body.FATHER_NAME ? req.body.FATHER_NAME : "";
        message.FATHER_CNIC = req.body.FATHER_CNIC ? req.body.FATHER_CNIC : "";
        message.FATHER_DD = req.body.FATHER_DD ? req.body.FATHER_DD : "";
        message.FATHER_ROD = req.body.FATHER_ROD ? req.body.FATHER_ROD : "";
        message.FATHER_OCCUPATION = req.body.FATHER_OCCUPATION ? req.body.FATHER_OCCUPATION : "";
        message.FATHER_DESIGNATION = req.body.FATHER_DESIGNATION ? req.body.FATHER_DESIGNATION : "";
        message.MOTHER_NAME = req.body.MOTHER_NAME ? req.body.MOTHER_NAME : "";
        message.MOTHER_CNIC = req.body.MOTHER_CNIC ? req.body.MOTHER_CNIC : "";
        message.MOTHER_DD = req.body.MOTHER_DD ? req.body.MOTHER_DD : "";
        message.MOTHER_ROD = req.body.MOTHER_ROD ? req.body.MOTHER_ROD : "";
        message.MOTHER_OCCUPATION = req.body.MOTHER_OCCUPATION ? req.body.MOTHER_OCCUPATION : "";
        message.MOTHER_DESIGNATION = req.body.MOTHER_DESIGNATION ? req.body.MOTHER_DESIGNATION : "";
        message.MOTHER_EDUCATION = req.body.MOTHER_EDUCATION ? req.body.MOTHER_EDUCATION : "";
        message.MOTHER_PHONE = req.body.MOTHER_PHONE ? req.body.MOTHER_PHONE : "";
        message.MOTHER_MOBILE = req.body.MOTHER_MOBILE ? req.body.MOTHER_MOBILE : "";
        message.MOTHER_PRESENT_ADDRESS = req.body.MOTHER_PRESENT_ADDRESS ? req.body.MOTHER_PRESENT_ADDRESS : "";
        message.MOTHER_PERMANENT_ADDRESS = req.body.MOTHER_PERMANENT_ADDRESS ? req.body.MOTHER_PERMANENT_ADDRESS : "";
        message.GURDIAN_NAME = req.body.GURDIAN_NAME ? req.body.GURDIAN_NAME : "";
        message.GURDIAN_PHONE = req.body.GURDIAN_PHONE ? req.body.GURDIAN_PHONE : "";
        message.GURDIAN_RELATION = req.body.GURDIAN_RELATION ? req.body.GURDIAN_RELATION : "";
        message.GURDIAN_OCCUPATION = req.body.GURDIAN_OCCUPATION ? req.body.GURDIAN_OCCUPATION : "";
        message.GURDIAN_DESIGNATION = req.body.GURDIAN_DESIGNATION ? req.body.GURDIAN_DESIGNATION : "";
        message.GURDIAN_EDUCATION = req.body.GURDIAN_EDUCATION ? req.body.GURDIAN_EDUCATION : "";
        message.GURDIAN_MOBILE = req.body.GURDIAN_MOBILE ? req.body.GURDIAN_MOBILE : "";
        message.GURDIAN_BANK_NAME = req.body.GURDIAN_BANK_NAME ? req.body.GURDIAN_BANK_NAME : "";
        message.GURDIAN_BRANCH_CODE = req.body.GURDIAN_BRANCH_CODE ? req.body.GURDIAN_BRANCH_CODE : "";
        message.GURDIAN_ADDRESS = req.body.GURDIAN_ADDRESS ? req.body.GURDIAN_ADDRESS : "";
        message.SCH_SESSION = req.body.SCH_SESSION ? req.body.SCH_SESSION : "";
        message.SCH_ADMISSION_DATE = req.body.SCH_ADMISSION_DATE ? req.body.SCH_ADMISSION_DATE : "";
        message.SCH_ADMISSION_NO = req.body.SCH_ADMISSION_NO ? req.body.SCH_ADMISSION_NO : "";
        message.SCH_CLASS = req.body.SCH_CLASS ? req.body.SCH_CLASS : "";
        message.SCH_FEE = req.body.SCH_FEE ? req.body.SCH_FEE : "";
        message.SCH_NAME = req.body.SCH_NAME ? req.body.SCH_NAME : "";
        message.SCH_MEDIUM = req.body.SCH_MEDIUM ? req.body.SCH_MEDIUM : "";
        message.SCH_PHONE = req.body.SCH_PHONE ? req.body.SCH_PHONE : "";
        message.SCH_PRINCIPAL_NAME = req.body.SCH_PRINCIPAL_NAME ? req.body.SCH_PRINCIPAL_NAME : "";
        message.SCH_PRINCIPAL_PHONE = req.body.SCH_PRINCIPAL_PHONE ? req.body.SCH_PRINCIPAL_PHONE : "";
        message.SCH_PRINCIPAL_TYPE = req.body.SCH_PRINCIPAL_TYPE ? req.body.SCH_PRINCIPAL_TYPE : "";
        message.SCH_ADDRESS = req.body.SCH_ADDRESS ? req.body.SCH_ADDRESS : "";
        message.SCH_BANK_NAME = req.body.SCH_BANK_NAME ? req.body.SCH_BANK_NAME : "";
        message.SCH_BRANCH_CODE = req.body.SCH_BRANCH_CODE ? req.body.SCH_BRANCH_CODE : "";
        message.SCH_ACCOUNT_NO = req.body.SCH_ACCOUNT_NO ? req.body.SCH_ACCOUNT_NO : "";
        message.SCH_ACCOUNT_TITLE = req.body.SCH_ACCOUNT_TITLE ? req.body.SCH_ACCOUNT_TITLE : "";
        message.SCH_BANK_ADDRESS = req.body.SCH_BANK_ADDRESS ? req.body.SCH_BANK_ADDRESS : "";



    }
    async process(message) {

        try {

            message.REG_ID = await sysConfig.getNextSeqValue("student_reg_id")
            await modle.createNewChildProfile(message);
            await modle.createNewChildGurdianProfile(message);
            await modle.createNewChildInstituteProfile(message);

        }
        catch (ex) {
            console.log(JSON.stringify(ex));
        }
    }
    async output(res, message) {
        res.responseBody.message = "Child Profile created successfully"
        res.status = "Success";
    }
    inputValidation(req) {

    }

}

module.exports = new PostChildProfile();
