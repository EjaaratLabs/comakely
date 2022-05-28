import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateNewProfile, GetProfilesList, GetAvailableProfilesList, LinkDonor, DeLinkDonor } from '../api/ChildProfileApis';
import { toast } from 'react-toastify';


const initialState = {
  profileData: {},
  profile: [],
  unAssignedList: [],
  status: 'idle',
  screenMode: 'list'
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createNewProfileAsync = createAsyncThunk(
  'childProfile/newprofile',
  async (data) => {
    const response = await CreateNewProfile(data.formData, data.token);
    return response.data;
  }
);

export const GetChildProfilesListAsync = createAsyncThunk(
  'childProfile/list',
  async (data) => {
    const response = await GetProfilesList(data.formData, data.token);
    return response.data;
  }
);

export const GetAvailableChildProfilesListAsync = createAsyncThunk(
  'childProfile/list/available',
  async (data) => {
    const response = await GetAvailableProfilesList(data.token);
    return response.data;
  }
);

export const linkDonorAsync = createAsyncThunk(
  'childProfile/linkdonor',
  async (data) => {
    const response = await LinkDonor(data.formData, data.token);
    return response.data;
  }
);

export const deLinkDonorAsync = createAsyncThunk(
  'childProfile/delinkdonor',
  async (data) => {
    const response = await DeLinkDonor(data.formData, data.token);
    return response.data;
  }
);

export const ChildProfileSlice = createSlice({
  name: 'childProfile',
  initialState,
  /*  reducers: {
      changeScreen: (state, action) => {
       // state.screen = action.payload
      },
  
    },*/
  extraReducers: (builder) => {
    builder
      .addCase(createNewProfileAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createNewProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        toast.success(action.payload.message)
        // state.profileData = action.payload.token;
      }).addCase(GetChildProfilesListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetChildProfilesListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profile = action.payload.list
        // state.profileData = action.payload.token;
      }).addCase(GetAvailableChildProfilesListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetAvailableChildProfilesListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.unAssignedList = action.payload.list
        // state.profileData = action.payload.token;
      }).addCase(linkDonorAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(linkDonorAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        toast.success(action.payload.message)
        // state.profileData = action.payload.token;
      }).addCase(deLinkDonorAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deLinkDonorAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        toast.success(action.payload.message)
        // state.profileData = action.payload.token;
      });
  },
});

export const { changeScreen } = ChildProfileSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getScreenMode = (state) => state.childProfile.screenMode;

export const getProfiles = (state) => state.childProfile.profile;

export const getAvailableProfiles = (state) => state.childProfile.unAssignedList;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default ChildProfileSlice.reducer;
