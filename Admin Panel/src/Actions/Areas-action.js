import AppDispatcher from '../Dispatch/dispatch.js';

const fetchAreas=()=>{
    var action={
        actionType:"GET_AREAS"
    };
    AppDispatcher.dispatch(action);
};
const createNewArea=(data,callback)=>{
    var action={
        actionType:"CREATE_AREAS",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchAreas,
    createNewArea  
};