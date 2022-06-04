import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAdDetails, GetAds, postNewAd } from '../api/AdsApi';
import { GetBlogList } from '../api/BlogApi'
import { toast } from 'react-toastify';

const initialState = {
  token: '',
  data: {},
  adDetails:{profile:{},details:{}},
  blogs:[],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const GetBlogListAsync = createAsyncThunk(
  'blog/list',
  async (data) => {
    const response = await GetBlogList(data.token);
    return response.data;
  }
);


export const BlogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(GetBlogListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetBlogListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.blogs = action.payload.blogs
      });
  },
});

export const { } = BlogSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getBlogs = (state) => state.blog.blogs;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default BlogSlice.reducer;
