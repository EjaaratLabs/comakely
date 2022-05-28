const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')

var myprofile={}
var collections=[]
var donationTemp={}
var requests=[]
var HomeStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    myProfile: function() {

        Axios.get(config["baseUrl"] + "/transaction/myprofile",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            myprofile = response.data["details"];
          
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    fetchMyRequests: function() {

        Axios.get(config["baseUrl"] + "/transaction/myrequests",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            requests = response.data["requests"];
        
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    fetchMyCollections: function() {
        donationTemp={}
        Axios.get(config["baseUrl"] + "/transaction/mycollections",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            collections = response.data["donations"];
          /*  for(var i=0;i<collect.length;i++)
            {
                var a=document.createElement('a');
             //   a.innerText="test"
               // collect[i]["action"]=<a>test</a>
            }*/
            
           /* collections.forEach(element => {
                var a=document.createElement('a');
                a.innerHTML="test"
                element["donationrefnum"]=a
               // element.donationrefnum.innerHTML="test"
                element.clickEvent=(val)=>{this.fetchDonationDetailsByrefNum(val.donationrefnum,callback)}
            });*/
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    fetchDonationDetailsByrefNum:function(refNum,callback) {
        donationTemp={}
        Axios.get(config["baseUrl"] + "/transaction/getdonation/"+refNum+"/refnum",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            donationTemp.donation = response.data["donation"];
            donationTemp.donationDetails= response.data["donationDetails"];
            callback(donationTemp);
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                 toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    changePassword(data,callback) {
        Axios.post(config["baseUrl"] + "/transaction/changepassword", {
            "oldPassword": data.oldPassword,
            "password":data.password
        },
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
           // alert(JSON.stringify(response))
            var message = response.data["message"];     
            toast.success(message);
            callback()
          //  this.fetchArea();
           
        }).catch((error) => {
           // console.log(error)
           // alert(JSON.stringify(error.response))
            if(error&& error.response && error.response.data)
            toast.error(error.response.data.message)
              
                //var message = error.data["message"];     
                //toast.error(message);
                //console.log(error)
            })

    },
    getProfile: function() {
        return myprofile;
    },
    getMyCollections: function() {
        return collections;
    },
    getDonationTemplate: function() {
        return donationTemp;
    },
    getMyRequests: function() {
        return requests;
    },


});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "FETCH_PROFILE":
            HomeStore.myProfile();
            break;
        case "FETCH_MY_COLLECTION":
            HomeStore.fetchMyCollections(action.callback)
            break;
        case "FETCH_MY_COLLECTION_BY_REF_NUM":
            HomeStore.fetchDonationDetailsByrefNum(action.refNum,action.callback)
            break;
        case "FETCH_MY_REQUESTS":
            HomeStore.fetchMyRequests()
            break;
        case "CHANGE_PASSWORD":
            HomeStore.changePassword(action.data,action.callback)
            break;
    }
});

module.exports = HomeStore;