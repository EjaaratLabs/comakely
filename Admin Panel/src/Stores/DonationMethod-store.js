const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')
var results = []

var DonationMethodStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    fetchMethods() {

        Axios.get(config["baseUrl"] + "/transaction/getdonationmethods",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["methods"];
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    createNewMethod(data,callback) {
        Axios.post(config["baseUrl"] + "/transaction/createdonationmethods", {
            "method": data.method,
            "methodId":data.id
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
            this.fetchMethods();
           
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    getMethods() {
        return results;
    },

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "GET_DONATION_METHODS":
            DonationMethodStore.fetchMethods();
            break;
        case "CREATE_DONATION_METHOD":
            DonationMethodStore.createNewMethod(action.data,action.callback);
            break;
    }
});

module.exports = DonationMethodStore;