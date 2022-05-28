const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')
var paymentmethods = []
var isLoadedEnable=false

var CommonStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    toggleLoader()
    {
        
        isLoadedEnable=!isLoadedEnable;
        this.emitChange()
    },
    fetchPaymentMethods() {

        Axios.get(config["baseUrl"] + "/transaction/getpaymentmethods",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            paymentmethods = response.data["methods"];
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    getPaymentMethods() {
        return paymentmethods;
    },

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "LOADER":
            CommonStore.toggleLoader()
            break;
        case "GET_PAYMENT_METHODS":
            CommonStore.fetchPaymentMethods()
             break;
        
    }
});

module.exports = CommonStore;