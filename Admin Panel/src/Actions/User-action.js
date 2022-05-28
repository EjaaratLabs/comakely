import AppDispatcher from '../Dispatch/dispatch.js';

const fetchUsers=()=>{
    var action={
        actionType:"GET_USERS"
    };
    AppDispatcher.dispatch(action);
};
const createNewUser=(data,callback)=>{
    var action={
        actionType:"CREATE_USER",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};


const myProfile=()=>{
    var action={
        actionType:"FETCH_PROFILE"
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchUsers,
    createNewUser,
    myProfile  
};