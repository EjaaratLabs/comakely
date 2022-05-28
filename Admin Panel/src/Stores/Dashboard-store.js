const toast = require('react-toastify').toast;
const Axios = require('axios').default;
var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const config = require('../helpers/config.json');
const AuthStore=require('./Authentication-store')

var results = {
    domainTotalCollection:{
        labels:[],
        data:[]
    },
    methodTotalCollection:{
        labels:[],
        data:[]
    },
    centerTotalCollection:{
        labels:[],
        data:[]
    }
}

var DashboardStore = assign({}, EventEmitter.prototype, {


    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    fetch() {

        Axios.get(config["baseUrl"] + "/dashboard",
            {
                headers: {
                    'Authorization': "Bearer " + AuthStore.getUserToken()
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {
          // results = response.data;    
         

        var collectionByArea=  response.data["collectionByArea"]?response.data["collectionByArea"]:[];
        var collectionByMethod=response.data["collectionByMethod"]?response.data["collectionByMethod"]:[];
        var collectionByCenter=response.data["collectionByCenter"]?response.data["collectionByCenter"]:[];
        
        results.domainTotalCollection.labels=[];
        results.domainTotalCollection.data=[]
        results.methodTotalCollection.labels=[];
        results.methodTotalCollection.data=[]
        results.centerTotalCollection.labels=[];
        results.centerTotalCollection.data=[]
        collectionByArea.forEach(element => {
    
            results.domainTotalCollection.labels.push(element.areaname);
            results.domainTotalCollection.data.push(parseInt(element.amount))
        });
        collectionByMethod.forEach(element => {
    
            results.methodTotalCollection.labels.push(element.method);
            results.methodTotalCollection.data.push(parseInt(element.amount))
        });
        collectionByCenter.forEach(element => {
    
            results.centerTotalCollection.labels.push(element.centername);
            results.centerTotalCollection.data.push(parseInt(element.amount))
        });
        
            this.emitChange();

        })
            .catch((error) => {
                //  toast.error(error.response.data.errorMessage)
                console.log(error)
            })
       // this.emitChange();
    },
    getDashboard() {
        return results;
    },
    getDomainTotalCollection()
    {
        return results.domainTotalCollection
    },
    getMethosTotalCollection()
    {
        return results.methodTotalCollection
    },
    getCentersTotalCollection()
    {
        return results.centerTotalCollection
    }

});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case "GET_DASHBOARD":
            DashboardStore.fetch();
            break;
    }
});

module.exports = DashboardStore ;