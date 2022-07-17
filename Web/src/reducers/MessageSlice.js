import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAds, postNewAd } from '../api/AdsApi';
import { Login } from '../api/AuthApis';
import { toast } from 'react-toastify';
import { CreateNewOrder, GetVendorOrders, UpdateOrderStatus } from '../api/OrderApi';
import { CreateNewMessage } from '../api/MessageApi';

const initialState = {
  token: '',
  vendorOrders: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const PostNewMessageAsync = createAsyncThunk(
  'message/new',
  async (data) => {

    const response = await CreateNewMessage(data.data, data.token);
    if (data.callback)
      data.callback()
    return response.data;
  }
);




export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder
      .addCase(PostNewMessageAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(PostNewMessageAsync.fulfilled, (state, action) => {

        state.status = 'idle';

        toast.success(action.payload.message)

      });
  },
});

export const { } = OrderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getVendorOrder = (state) => state.order.vendorOrders;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default OrderSlice.reducer;
