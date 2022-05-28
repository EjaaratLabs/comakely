import AppDispatcher from '../Dispatch/dispatch.js';

const toggleLoader=()=>{
    var action={
        actionType:"LOADER"
    };
    AppDispatcher.dispatch(action);
};
const fetchPaymentMethods=()=>{
    var action={
        actionType:"GET_PAYMENT_METHODS"
    };
    AppDispatcher.dispatch(action);
};


export{
    toggleLoader,
    fetchPaymentMethods 
};