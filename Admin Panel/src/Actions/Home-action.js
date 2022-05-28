import AppDispatcher from '../Dispatch/dispatch.js';


const myProfile=()=>{
    var action={
        actionType:"FETCH_PROFILE"
    };
    AppDispatcher.dispatch(action);
};
const fetchMyCollections=()=>{
    var action={
        actionType:"FETCH_MY_COLLECTION"
    };
    AppDispatcher.dispatch(action);
};
const fetchDonationDetailsByrefNum=(refNum,callback)=>{
    var action={
        actionType:"FETCH_MY_COLLECTION_BY_REF_NUM",
        refNum,
        callback
    };
    AppDispatcher.dispatch(action);
};
const fetchMyRequests=()=>{
    var action={
        actionType:"FETCH_MY_REQUESTS"
    };
    AppDispatcher.dispatch(action);
};
const changePassword=(data,callback)=>{
    var action={
        actionType:"CHANGE_PASSWORD",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};

export{
    myProfile ,
    fetchMyCollections,
    fetchDonationDetailsByrefNum,
    fetchMyRequests,
    changePassword
};