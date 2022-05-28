import AppDispatcher from '../Dispatch/dispatch.js';


const createNewDonation=(data,callback,success)=>{
    var action={
        actionType:"CREATE_DONATION",
        data,
        callback,
        success
    };
    AppDispatcher.dispatch(action);
};
const updateDonation=(data,callback)=>{
    var action={
        actionType:"UPDATE_DONATION",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};
const updateTransactionStatus=(data,callback)=>{
    var action={
        actionType:"UPDATE_TRANSACTION",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};
const collectHomeDonation=(data,callback)=>{
    var action={
        actionType:"COLLECT_DONATION_HOME",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};
const fetchDonorDetails=(phone)=>{
    var action={
        actionType:"FETCH_DONAR_DETAILS",
        phone
    };
    AppDispatcher.dispatch(action);
};


const fetchDonations=()=>{
    var action={
        actionType:"GET_DONATIONS"
    };
    AppDispatcher.dispatch(action);
};

const fetchDonationsFilter=(status,method,processStatus)=>{
    var action={
        actionType:"GET_DONATIONS_FILTER",
        status,
        method,
        processStatus
    };
    AppDispatcher.dispatch(action);
};

const fetchDonationsDetailsFilter=(status,method,processStatus)=>{
    var action={
        actionType:"GET_DONATIONS_DET_FILTER",
        status,
        method,
        processStatus
    };
    AppDispatcher.dispatch(action);
};

const fetchDonationsPickUp=()=>{
    var action={
        actionType:"GET_DONATIONS_PICK_UP"
    };
    AppDispatcher.dispatch(action);
};
const resetDonorDetails=()=>{
    var action={
        actionType:"RESET_DONAR_DETAILS"
    };
    AppDispatcher.dispatch(action);
};

const fetchDonationByRefNum=(refNum)=>{
    var action={
        refNum,
        actionType:"FETCH_DONATION_DETAILS"
    };
    AppDispatcher.dispatch(action);
};

export{
    createNewDonation ,
    fetchDonorDetails, 
    resetDonorDetails,
    fetchDonations,
    fetchDonationsPickUp,
    fetchDonationByRefNum,
    collectHomeDonation,
    updateDonation,
    fetchDonationsFilter,
    updateTransactionStatus,
    fetchDonationsDetailsFilter
};