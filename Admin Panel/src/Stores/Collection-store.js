const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')
var results = []

var CollectionStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    fetchCollection(type) {

        Axios.get(config["baseUrl"] + "/transaction/getcollection?type="+(type!="0"?type:""),
            {
                headers: {
                    'Authorization': "Bearer " +AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))

            results = response.data["ledger"];
            this.emitChange();
            // force the re-render
        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
        this.emitChange();
    },
    collectAmount(data,callback,secondCallback) {
        Axios.post(config["baseUrl"] + "/transaction/postcollection", {
            "amount": data.amount,
            "userId":data.userId,
            "mode":data.mode
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
            secondCallback(response.data)
            this.fetchCollection();
           
        })
            .catch((error) => {
               // console.log(error)
                 toast.error((error.response.data&&error.response.data.message)?error.response.data.message:((error.response.data&&error.response.data.errorMessage)?error.response.data.errorMessage:"Technical error occured."))
               
            })

    },
    getCollection() {
        return results;
    },

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "GET_COLLECTION":
            CollectionStore.fetchCollection(action.type)
            break;
        case "COLLECT_COLLECTION":
            CollectionStore.collectAmount(action.data,action.callback,action.secondCallback);
            break;
    }
});

module.exports = CollectionStore;