import AppDispatcher from '../Dispatch/dispatch.js';

const fetch=()=>{
    var action={
        actionType:"GET_DASHBOARD"
    };
    AppDispatcher.dispatch(action);
};

export{
    fetch, 
};