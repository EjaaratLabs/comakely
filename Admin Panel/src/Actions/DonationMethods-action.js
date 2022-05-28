import AppDispatcher from '../Dispatch/dispatch.js';

const fetchMethods=()=>{
    var action={
        actionType:"GET_DONATION_METHODS"
    };
    AppDispatcher.dispatch(action);
};
const createNewMethod=(data,callback)=>{
    var action={
        actionType:"CREATE_DONATION_METHOD",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchMethods,
    createNewMethod  
};