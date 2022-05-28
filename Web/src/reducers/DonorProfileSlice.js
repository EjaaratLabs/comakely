import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateNewProfile, GetProfilesList, GetLinkedChild,GetDonorDetails } from '../api/DonorProfileApis'
import { toast } from 'react-toastify';


const initialState = {
  profileData: {},
  profile: [],
  linkedChild: [],
  status: 'idle',
  screenMode: 'list'
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createNewProfileAsync = createAsyncThunk(
  'DonorProfile/newprofile',
  async (data) => {
    const response = await CreateNewProfile(data.formData, data.token);
    data.callback()
    return response.data;
  }
);

export const GetDonorProfilesListAsync = createAsyncThunk(
  'DonorProfile/list',
  async (data) => {
 
    const response = await GetProfilesList(data.formData, data.token);
    return response.data;
  }
);

export const GetDonorLinkedAsync = createAsyncThunk(
  'DonorProfile/linked/list',
  async (data) => {
    const response = await GetLinkedChild(data.params, data.token);
    return response.data;
  }
);


export const GetDonorDetailsAsync = createAsyncThunk(
  'DonorProfile/details',
  async (data) => {
    const response = await GetDonorDetails(data.params, data.token);
    return response.data;
  }
);



export const DonorProfileSlice = createSlice({
  name: 'DonorProfile',
  initialState,
  reducers: {
    changeScreen: (state, action) => {

      state.screenMode = action.payload
    },
    openDetails: (state, action) => {
      state.profileData = action.payload
      state.screenMode = "details"
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProfileAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createNewProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        toast.success(action.payload.message)
        state.screenMode = "list"

        // state.profileData = action.payload.token;
      }).addCase(GetDonorProfilesListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetDonorProfilesListAsync.fulfilled, (state, action) => {
 
        state.status = 'idle';
        state.profile = action.payload.list
     
        // state.profileData = action.payload.token;
      }).addCase(GetDonorLinkedAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetDonorLinkedAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.linkedChild = action.payload.list
        // state.profileData = action.payload.token;
      }).addCase(GetDonorDetailsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetDonorDetailsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profileData= action.payload
        // state.profileData = action.payload.token;
      });;
  },
});

export const { changeScreen, openDetails } = DonorProfileSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getScreenMode = (state) => state.donorProfile.screenMode;

export const getProfiles = (state) => state.donorProfile.profile;

export const getLinkedChild = (state) => state.donorProfile.linkedChild;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default DonorProfileSlice.reducer;
