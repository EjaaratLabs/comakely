const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore = require('./Authentication-store')
var results = []
var settleresults = []
var userRequests = []
var RequestStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    fetchRequest() {

        Axios.get(config["baseUrl"] + "/transaction/getrequests",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["requests"];

            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    fetchUserRequests() {

        Axios.get(config["baseUrl"] + "/user/requests",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            userRequests = response.data["users"];

            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    fetchSettlementRequest() {

        Axios.get(config["baseUrl"] + "/transaction/getsettlementrequest",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            settleresults = response.data["requests"];

            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    }, updateUserRequestStatus(data, callback) {
        Axios.post(config["baseUrl"] + "/user/updatestatus", {
            "status": data.status,
            "userName": data.userName
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            var message = response.data["message"];
            toast.success(message);
            callback()
            //   this.emitChange()
            this.fetchUserRequests()

        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    createNewRequest(data, callback) {
        Axios.post(config["baseUrl"] + "/transaction/createrequest", {
            "subject": data.subject,
            "message": data.message
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            var message = response.data["message"];
            toast.success(message);
            callback()
            //   this.emitChange()
            this.fetchRequest();

        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    createNewSettlementRequest(data, callback) {
        Axios.post(config["baseUrl"] + "/transaction/postsettlementrequest", {
            "chequeNo": data.chequeNo,
            "amount": data.amount,
            "remarks": data.remarks,
            "img": data.img,
            "imgName": data.imgName
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            var message = response.data["message"];
            toast.success(message);
            callback()
            //   this.emitChange()
            this.fetchSettlementRequest()

        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    updateSettlementRequest(data, callback) {
        console.log(data)
        Axios.post(config["baseUrl"] + "/transaction/updatesettlementrequest", {
            "reqId": data.reqId,
            "reqStatus": data.reqStatus,
            "remarks": data.remarks
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            var message = response.data["message"];
            toast.success(message);
            callback()
            //   this.emitChange()
            //  this.fetchRequest();
            this.fetchSettlementRequest()
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    getRequests() {
        return results;
    },
    getUserRequests() {
        return userRequests;
    },
    getSettlementRequests() {
        return settleresults;
    },
});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "GET_REQUEST":
            RequestStore.fetchRequest()
            break;
        case "GET_USER_REQUEST":
            RequestStore.fetchUserRequests()
            break;
        case "GET_SETTLEMENT_REQUEST":
            RequestStore.fetchSettlementRequest()
            break;
        case "CREATE_REQUEST":
            RequestStore.createNewRequest(action.data, action.callback);
            break;
        case "UPDATE_USER_REQUEST_STATUS":
            RequestStore.updateUserRequestStatus(action.data, action.callback);
            break;
        case "UPDATE_SETTLEMENT_REQUEST":
            RequestStore.updateSettlementRequest(action.data, action.callback);
            break;
        case "CREATE_SETTLEMENT_REQUEST":
            RequestStore.createNewSettlementRequest(action.data, action.callback);
            break;
    }
});

module.exports = RequestStore;