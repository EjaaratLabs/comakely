import AppDispatcher from '../Dispatch/dispatch.js';

const generateDailyUserReport=()=>{
    var action={
        actionType:"DAILY_USER_REPORT"
    };
    AppDispatcher.dispatch(action);
};
const generateCustomReport=(data)=>{
    var action={
        actionType:"CUSTOM_REPORT",
        data
    };
    AppDispatcher.dispatch(action);
};

export{
    generateDailyUserReport,
    generateCustomReport
};