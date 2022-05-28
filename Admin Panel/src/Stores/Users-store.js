const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')
var results = []
var myprofile={}
var UserStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    fetchUsers() {

        Axios.get(config["baseUrl"] + "/transaction/getusers",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["users"];
          
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    myProfile() {

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
    createNewUser(data, callback) {
        Axios.post(config["baseUrl"] + "/transaction/createuser", {
            "name": data.name,
            "userName": data.userName,
            "password": data.password,
            "phone": data.phone,
            "email": data.email,
            "address": data.address,
            "roleId": data.roleId,
            "channelId": data.channelId,
            "centerId": data.centerId
        },
            {
                headers: {
                    'Authorization': "Bearer " +  AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
            var message = response.data["message"];
            toast.success(message);
            callback()
            this.fetchUsers();

        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    getUsers() {
        return results;
    },
    getProfile() {
        return myprofile;
    },


});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "GET_USERS":
            UserStore.fetchUsers();
            break;
        case "CREATE_USER":
            UserStore.createNewUser(action.data, action.callback);
            break;
        case "FETCH_PROFILE":
            UserStore.myProfile();
            break;
    }
});

module.exports = UserStore;