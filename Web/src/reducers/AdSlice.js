import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAdDetails, GetAds, postNewAd } from '../api/AdsApi';
import { Login } from '../api/AuthApis';
import { toast } from 'react-toastify';

const initialState = {
  token: '',
  data: {},
  adDetails:{profile:{},details:{}},
  ads:[],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const postAnAd = createAsyncThunk(
  'ad/new',
  async (data) => {

    const response = await postNewAd(data.data, data.token);
    //console.log(response)
    data.callback()
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const GetAdsListAsync = createAsyncThunk(
  'ad/list',
  async (data) => {
    const response = await GetAds(data.token, data.adType);
    return response.data;
  }
);

export const GetAdDetailsAsync = createAsyncThunk(
  'ad/details',
  async (data) => {
    const response = await GetAdDetails(data.token, data.id);
    return response.data;
  }
);

export const AdSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder
      .addCase(postAnAd.pending, (state) => {

        state.status = 'loading';
      })
      .addCase(postAnAd.fulfilled, (state, action) => {

        state.status = 'idle';

        toast.success(action.payload.message)
      }).addCase(GetAdsListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetAdsListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.ads = action.payload.list
        // state.profileData = action.payload.token;
      }).addCase(GetAdDetailsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetAdDetailsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.adDetails = {details:action.payload.details,profile:action.payload.profile}
        // state.profileData = action.payload.token;
      });;
  },
});

export const { } = AdSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getAds = (state) => state.adServ.ads;
export const getAdDetails = (state) => state.adServ.adDetails;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default AdSlice.reducer;
