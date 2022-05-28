const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')
var results = []

var DonationTypeStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    fetchTypes() {

        Axios.get(config["baseUrl"] + "/transaction/getdonationtypes",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["types"];
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    createNewType(data,callback) {
        Axios.post(config["baseUrl"] + "/transaction/createdonationtypes", {
            "type": data.type,
            "typeId":data.id
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
            this.fetchTypes();
           
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })

    },
    getTypes() {
        return results;
    },

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "GET_DONATION_TYPES":
            DonationTypeStore.fetchTypes();
            break;
        case "CREATE_DONATION_TYPES":
            DonationTypeStore.createNewType(action.data,action.callback);
            break;
    }
});

module.exports = DonationTypeStore;