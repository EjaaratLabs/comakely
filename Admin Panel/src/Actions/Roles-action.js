import AppDispatcher from '../Dispatch/dispatch.js';

const fetchRole=()=>{
    var action={
        actionType:"GET_ROLE"
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
const fetchPermission=()=>{
    var action={
        actionType:"GET_PERMISSION"
    };
    AppDispatcher.dispatch(action);
};
export{
    fetchRole,
    fetchPermission 
};