const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')
var results = []
var permissions=[]

var RolesStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    fetchRole() {

        Axios.get(config["baseUrl"] + "/transaction/getuserroles",
            {
                headers: {
                    'Authorization': "Bearer " +  AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["roles"];
           
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    fetchPermission() {

        Axios.get(config["baseUrl"] + "/transaction/getpermissions",
            {
                headers: {
                    'Authorization': "Bearer " +  AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            permissions = response.data["permissions"];
           
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    createNewRole(data,callback) {
        Axios.post(config["baseUrl"] + "/transaction/createRole", {
            "RoleName": data.name,
            "RolePhone": data.phone,
            "RoleAddress": data.address,
            "RoleCity": data.city
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
            this.fetchRole();
           
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    getRoles() {
        return results;
    },
    getPermissions() {
        return permissions;
    },

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "GET_ROLE":
            RolesStore.fetchRole();
            break;
        case "GET_PERMISSION":
            RolesStore.fetchPermission();
            break;
        case "CREATE_ROLE":
            RolesStore.createNewRole(action.data,action.callback);
            break;
    }
});

module.exports = RolesStore;