const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')
var results = []
var projects = []
var packages = []

var DonationPurposeStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    fetchPurposes(areaId) {
        var url=areaId?("/transaction/getdonationpurpose?areaId="+areaId):"/transaction/getdonationpurpose";
        Axios.get(config["baseUrl"] + url,
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["list"];
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    fetchPurposesPackages(id) {
        var url="/transaction/getallpackages?projectId="+id
        Axios.get(config["baseUrl"] + url,
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))
          //  alert(JSON.stringify(response.data))
            packages = response.data["list"]?response.data["list"]:[];
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
               
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    createNewPurpose(data,callback) {
        Axios.post(config["baseUrl"] + "/transaction/createdonationpurpose", {
            "purpose": data.purpose,
            "purposeId":data.id,
            "areaId":data.areaId,
            "customAllowed":data.customAllowed,
            "amount":data.amount,
            "isZakat":data.isZakat,
            "isSadqa":data.isSadqa
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
            this.fetchPurposes();
           
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },

    fetchProjects() {
        Axios.get(config["baseUrl"] + "/transaction/getprojects",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            projects = response.data["projects"];
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    getList() {
        return results;
    },
    getProjects() {
        return projects;
    },
    getPackages() {
       
        return packages;
    }

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "GET_DONATION_PURPOSE":
            DonationPurposeStore.fetchPurposes(action.areaId);
            break;
        case "CREATE_DONATION_PURPOSE":
            DonationPurposeStore.createNewPurpose(action.data,action.callback);
            break;
        case "GET_PROJECTS":
            DonationPurposeStore.fetchProjects();
            break;
        case "GET_PROJECT_PACKAGE":
            DonationPurposeStore.fetchPurposesPackages(action.id)
            break;
    }
});

module.exports = DonationPurposeStore;