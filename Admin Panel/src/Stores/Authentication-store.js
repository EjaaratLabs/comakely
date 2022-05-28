const toast = require('react-toastify').toast;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const Axios = require('axios').default;
const config = require('../helpers/config.json');
var isLoadedEnable=false

var loginState = false;
var permissions = [];
var token=""
var landingPage=""
var AuthStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }, signIn(userName,password) {
   
       // CStore.toggleLoader()
       isLoadedEnable=true;
       this.emitChange()

        Axios.post(config["baseUrl"] + "/api/User/login", {
            "f8996da763b7a969b1": userName,
            //this.state.userName,
            "d74ff0ee8da3b9806b": password
            //this.state.password,
        },
        ).then((response) => {

            //toast.error(JSON.stringify(error))
            token= response.data["token"];
            loginState = true; // force the re-render
            //CStore.toggleLoader()
            landingPage=response.data["landingPage"]
            
            isLoadedEnable=false;
            this.emitChange()
          
        })
            .catch((error) => {
              //  alert(JSON.stringify(error))
             // CStore.toggleLoader()
             isLoadedEnable=false;
             this.emitChange()
             toast.error(error.response.data.errorMessage)
           
            })

       
    },
    fetchUserPermissions() {
        Axios.get(config["baseUrl"] + "/transaction/getuserpermissions",
            {
                headers: {
                    'Authorization': "Bearer " +  token
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            permissions = response ? response.data["permissions"] : [];

            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    getUserPermissions() {
        return permissions;
    },
    getLoginState() {
        return loginState;
    },
    getUserToken() {
        return token;
    },
    getLandingPage() {
        return landingPage;
    },
    signOut()
    {
        loginState = false;
        token="" // force the re-render
        this.emitChange();
    },
    getLoaderState()
    {
        return isLoadedEnable
    }   
});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "SIGNIN":
            AuthStore.signIn(action.userName,action.password);
            break;
        case "SIGNOUT":
            AuthStore.signOut();
            break;
        case "GET_USER_PERMISSION":
            AuthStore.fetchUserPermissions();
            break;
    }
});

module.exports = AuthStore;