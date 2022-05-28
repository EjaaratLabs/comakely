import AppDispatcher from '../Dispatch/dispatch.js';

const fetchCenters=()=>{
    var action={
        actionType:"GET_CENTER"
    };
    AppDispatcher.dispatch(action);
};
const createNewCenter=(data,callback)=>{
    var action={
        actionType:"CREATE_CENTER",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchCenters,
    createNewCenter  
};