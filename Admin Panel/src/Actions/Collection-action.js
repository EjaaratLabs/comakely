import AppDispatcher from '../Dispatch/dispatch.js';

const fetchCollection=(type)=>{
    var action={
        actionType:"GET_COLLECTION",
        type
    };
    AppDispatcher.dispatch(action);
};
const collectAmount=(data,callback,secondCallback)=>{
    var action={
        actionType:"COLLECT_COLLECTION",
        data,
        callback,
        secondCallback
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchCollection,
    collectAmount 
};