

var AppDispatcher = require('../Dispatch/dispatch.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var isLoadedEnable=false;

var LoaderStore = assign({}, EventEmitter.prototype, {
    
    
    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }, 
    toggleLoader: function () 
    {
  
        isLoadedEnable=!isLoadedEnable;
        this.emitChange()
    },
    toggleOnLoader: function () 
    {
  
        isLoadedEnable=true;
        this.emitChange()
    },
    toggleOffLoader: function () 
    {
  
        isLoadedEnable=false;
        this.emitChange()
    },
    getLoaderState()
    {
        return isLoadedEnable
    }   
});
module.exports = LoaderStore;