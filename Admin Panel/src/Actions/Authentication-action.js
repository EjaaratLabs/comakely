import AppDispatcher from '../Dispatch/dispatch.js';

const signIn=(userName,password)=>{
    var action={
        actionType:"SIGNIN",
        userName,
        password
    };
    AppDispatcher.dispatch(action);
};
const signOut=()=>{
    var action={
        actionType:"SIGNOUT"
    };
    AppDispatcher.dispatch(action);
};
const fetchUserPermissions=()=>{
    var action={
        actionType:"GET_USER_PERMISSION"
    };
    AppDispatcher.dispatch(action);
};

export{
    signIn,
    fetchUserPermissions,
    signOut
};