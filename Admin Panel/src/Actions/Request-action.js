import AppDispatcher from '../Dispatch/dispatch.js';

const fetchRequest=()=>{
    var action={
        actionType:"GET_REQUEST"
    };
    AppDispatcher.dispatch(action);
};

const fetchUserRequests=()=>{
    var action={
        actionType:"GET_USER_REQUEST"
    };
    AppDispatcher.dispatch(action);
};
const fetchSettlementRequest=()=>{
    var action={
        actionType:"GET_SETTLEMENT_REQUEST"
    };
    AppDispatcher.dispatch(action);
};
const updateUserRequestStatus=(data,callback)=>{
    var action={
        actionType:"UPDATE_USER_REQUEST_STATUS",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};
const createNewRequest=(data,callback)=>{
    var action={
        actionType:"CREATE_REQUEST",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};
const createNewSettlementRequest=(data,callback)=>{
    var action={
        actionType:"CREATE_SETTLEMENT_REQUEST",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};
const updateSettlementRequest=(data,callback)=>{
    var action={
        actionType:"UPDATE_SETTLEMENT_REQUEST",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchRequest,
    createNewRequest,
    createNewSettlementRequest,
    fetchSettlementRequest,
    updateSettlementRequest  ,
    fetchUserRequests,
    updateUserRequestStatus
};