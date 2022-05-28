import AppDispatcher from '../Dispatch/dispatch.js';

const fetchPurposes=(areaId)=>{
    var action={
        actionType:"GET_DONATION_PURPOSE",
        areaId
    };
    AppDispatcher.dispatch(action);
};
const fetchPurposesPackages=(id)=>{
    var action={
        actionType:"GET_PROJECT_PACKAGE",
        id
    };
    AppDispatcher.dispatch(action);
};
const createNewPurposes=(data,callback)=>{
    var action={
        actionType:"CREATE_DONATION_PURPOSE",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};
const fetchProjects=()=>{
    var action={
        actionType:"GET_PROJECTS"
    };
    AppDispatcher.dispatch(action);
}

export{
    fetchPurposes,
    createNewPurposes,
    fetchProjects,
    fetchPurposesPackages  
};