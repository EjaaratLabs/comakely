import AppDispatcher from '../Dispatch/dispatch.js';

const fetchChannels=()=>{
    var action={
        actionType:"GET_CHANNELS"
    };
    AppDispatcher.dispatch(action);
};
const createNewChannel=(name,callback)=>{
    var action={
        actionType:"CREATE_CHANNELS",
        name,
        callback
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchChannels,
    createNewChannel  
};