const toast = require('react-toastify').toast;
const Axios = require('axios').default;
const LoaderStore = require('../Stores/Loader-store.js');
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore = require('./Authentication-store')
var results = []
var donations = []
var pickupResults = []
var donorDetails = {}
var reciptDeatils = {}
var donationDetails = { info: {}, details: [] }

var DonationsStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    resetDonations() {
        donations = []
        this.emitChange();
    },
    fetchDonations() {
        LoaderStore.toggleLoader()
        Axios.get(config["baseUrl"] + "/transaction/getalldonations",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            LoaderStore.toggleLoader()
            //toast.error(JSON.stringify(error))

            results = response.data["donations"];
            this.emitChange();
            //this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    fetchDonationDetailsByFilter(status, method, processStatus) {
        LoaderStore.toggleOnLoader()
        Axios.get(config["baseUrl"] + "/donationdetails/list?donationStatus=" + status + "&donationMethod=" + method + "&processStatus=" + processStatus,
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            LoaderStore.toggleOffLoader()
            //toast.error(JSON.stringify(error))

            donations = response.data["donations"];
            this.emitChange();

            //this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
                LoaderStore.toggleOffLoader()
            })

    },
    fetchDonationByFilter(status, method, processStatus) {
        LoaderStore.toggleOnLoader()
        Axios.get(config["baseUrl"] + "/donations/list?donationStatus=" + status + "&donationMethod=" + method + "&processStatus=" + processStatus,
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            LoaderStore.toggleOffLoader()
            //toast.error(JSON.stringify(error))

            donations = response.data["donations"];
            this.emitChange();
            //this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                LoaderStore.toggleOffLoader()
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    fetchDonationByRefNum: function (refNum) {
        LoaderStore.toggleOnLoader()
        Axios.get(config["baseUrl"] + "/transaction/getdonation/" + refNum,
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            LoaderStore.toggleOffLoader()
            //toast.error(JSON.stringify(error))

            donationDetails.info = response.data["donationInfo"];
            donationDetails.details = response.data["donationDetails"];
            console.log(JSON.stringify(donationDetails.details))
            this.emitChange();

            // this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                LoaderStore.toggleOffLoader()
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    fetchDonationsPickUp() {

        Axios.get(config["baseUrl"] + "/transaction/getdonationpickup",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            pickupResults = response.data["donations"];
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    createNewDonation(data, callback,success) {
        LoaderStore.toggleOnLoader()
        Axios.post(config["baseUrl"] + "/transaction/newdonation", {
            name: data.name,
            // lastName: data.lastName,
            reference: data.reference,
            email: data.email,
            phone: data.phone,
            cnic: data.cnic,
            address: data.address,
            paymentMethodId: data.methodId,
            paymentMethodName: data.method,
            chequeNo: data.chequeNo,
            detailsList: data.donationList,
            comment: data.comment
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            LoaderStore.toggleOffLoader()
          /*  donationDeatils={
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                cnic: data.cnic,
                address: data.address,
                detailsList: data.donationList
            }*/;

            reciptDeatils = response.data["reciptDetails"];
            var message = response.data["message"];
            //alert(JSON.stringify(response.data["reciptDetails"]))
            toast.success(message);
            callback(reciptDeatils)
     
            this.emitChange();
            success()
            //  callback()
            // this.fetchTypes();

        })
            .catch((error) => {
                LoaderStore.toggleOffLoader()
                // donationDeatils={};
                this.emitChange();
                toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    updateTransactionStatus(data, callback) {
        LoaderStore.toggleOnLoader()
        Axios.post(config["baseUrl"] + "/donations/update", {
            donationStatus: data.donationStatus,
            processStatus: data.processStatus,
            donationMethod:data.donationMethod,
            comments: data.comment,
            refNum: data.refNum,
            recieptNo:data.recieptNo
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            LoaderStore.toggleOffLoader()
            var message = response.data["message"];

            toast.success(message);
            callback()
            this.emitChange();


        })
            .catch((error) => {
                LoaderStore.toggleOffLoader()
                // donationDeatils={};
                this.emitChange();
                toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    collectHomeDonation(data, callback) {

        Axios.post(config["baseUrl"] + "/transaction/collectdonation", {
            donationRefNum: data.donationRefNum,
            amount: data.amountCollected,
            paymentMethodId: data.paymentMethodId,
            comment: data.comment
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
          /*  donationDeatils={
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                cnic: data.cnic,
                address: data.address,
                detailsList: data.donationList
            }*/;

            reciptDeatils = response.data["reciptDetails"];
            var message = response.data["message"];
            //alert(JSON.stringify(response.data["reciptDetails"]))
            toast.success(message);
            callback(reciptDeatils)
            this.emitChange();
            this.fetchDonationsPickUp();
            //  callback()
            // this.fetchTypes();

        })
            .catch((error) => {

                // donationDeatils={};
                this.emitChange();
                toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    updateDonation(data, callback) {
        LoaderStore.toggleOnLoader()
        Axios.post(config["baseUrl"] + "/transaction/updatedonation/" + data.donationRefNum, {
            comments: data.comments,
            status: data.status,
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            LoaderStore.toggleOffLoader()
            var message = response.data["message"];
            //alert(JSON.stringify(response.data["reciptDetails"]))
            toast.success(message);
            callback()
            this.emitChange();
            this.fetchDonationByRefNum(data.donationRefNum)
            //  callback()
            // this.fetchTypes();

        })
            .catch((error) => {
                LoaderStore.toggleOffLoader()
                // donationDeatils={};
                this.emitChange();
                toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    fetchDonorDetails(phone) {

        Axios.get(config["baseUrl"] + "/transaction/getdonordetails?phone=" + encodeURI(phone),
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            donorDetails = response.data["details"];

            toast.success("Details fetched sucessfully");
            this.emitChange();
            //  callback()
            // this.fetchTypes();

        })
            .catch((error) => {

                //  donorDetails = {};
                // toast.error("Failed to fetch details.");
                this.emitChange();
                console.log(error)
            })

    },
    getDonorDetails() {
        return donorDetails;
    },
    getReciptDetails() {
        return reciptDeatils;
    },
    resetDonorDetails() {
        donorDetails = {};
        this.emitChange();
    },
    getDonationList() {
        return results;
    },
    getDonationFilteredList() {
        return donations;
    },
    getDonationPickUpList() {
        return pickupResults;
    },
    getDonationDetails() {
        return donationDetails;
    }

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case "CREATE_DONATION":
            DonationsStore.createNewDonation(action.data, action.callback,action.success);
            break;
        case "UPDATE_DONATION":
            DonationsStore.updateDonation(action.data, action.callback);
            break;
        case "UPDATE_TRANSACTION":
            DonationsStore.updateTransactionStatus(action.data, action.callback);
            break;
        case "COLLECT_DONATION_HOME":
            DonationsStore.collectHomeDonation(action.data, action.callback);
            break;
        case "FETCH_DONAR_DETAILS":
            DonationsStore.fetchDonorDetails(action.phone);
            break;
        case "RESET_DONAR_DETAILS":
            DonationsStore.resetDonorDetails();
            break;
        case "GET_DONATIONS":
            DonationsStore.fetchDonations()
            break;
        case "GET_DONATIONS_FILTER":
            DonationsStore.fetchDonationByFilter(action.status, action.method, action.processStatus)
            break;
         case "GET_DONATIONS_DET_FILTER":
            DonationsStore.fetchDonationDetailsByFilter(action.status, action.method, action.processStatus)
            break;
        case "GET_DONATIONS_PICK_UP":
            DonationsStore.fetchDonationsPickUp()
            break;
        case "FETCH_DONATION_DETAILS":
            DonationsStore.fetchDonationByRefNum(action.refNum);
            break;
    }
});

module.exports = DonationsStore;