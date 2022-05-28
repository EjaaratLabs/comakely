import AppDispatcher from '../Dispatch/dispatch.js';

const fetchTypes=()=>{
    var action={
        actionType:"GET_DONATION_TYPES"
    };
    AppDispatcher.dispatch(action);
};
const createNewType=(data,callback)=>{
    var action={
        actionType:"CREATE_DONATION_TYPES",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchTypes,
    createNewType  
};