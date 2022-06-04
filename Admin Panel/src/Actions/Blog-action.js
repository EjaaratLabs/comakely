import AppDispatcher from '../Dispatch/dispatch.js';

const fetchBlogs=()=>{
    var action={
        actionType:"GET_BLOGS"
    };
    AppDispatcher.dispatch(action);
};
const createNewBlogs=(data,callback)=>{
    var action={
        actionType:"CREATE_BLOG",
        data,
        callback
    };
    AppDispatcher.dispatch(action);
};

export{
    fetchBlogs,
    createNewBlogs  
};