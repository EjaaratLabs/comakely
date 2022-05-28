import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserProfile, Login, Register } from '../api/AuthApis';
import { toast } from 'react-toastify';

const initialState = {
  token: '',
  data: {},
  userProfile:{},
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  'authentication/login',
  async (data) => {

    const response = await Login(data);
    console.log(response)
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchUserDetailsAsync = createAsyncThunk(
  'authentication/fetchUserDetails',
  async (data) => {

    const response = await getUserProfile(data.token);
    console.log(response)
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);


export const registerAsync = createAsyncThunk(
  'authentication/register',
  async (data) => {

    const response = await Register(data);
    data.callback()
    console.log(response)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const AuthSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetToken: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = ''
    }
  },
  extraReducers: (builder) => {

    builder
      .addCase(loginAsync.pending, (state) => {

        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {


        state.token = action.payload.data.token;
        state.data = action.payload.data.data

        state.status = 'idle';

      }).addCase(loginAsync.rejected, (state, action) => {

        toast.error("Invalid Username or password.")
        state.status = 'idle';

      }) .addCase(fetchUserDetailsAsync.pending, (state) => {

        state.status = 'loading';
      })
      .addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {


        state.userProfile = action.payload.data;
        state.status = 'idle';

      }).addCase(registerAsync.pending, (state) => {

        state.status = 'loading';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {

        state.status = 'idle';
        toast.success("User registered successfully !")
      });;
  },
});

export const { resetToken } = AuthSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getToken = (state) => state.authentication.token;
export const getUserData = (state) => state.authentication.data;
export const getUserProfileData = (state) => state.authentication.userProfile;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default AuthSlice.reducer;
