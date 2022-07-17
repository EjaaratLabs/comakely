import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAds, postNewAd } from '../api/AdsApi';
import { Login } from '../api/AuthApis';
import { toast } from 'react-toastify';
import { GetVendorDetails,CreateVendorServices, GetVendors, CreateUpdateVendorProfile, CreateVendorProductProfile, GetVendorProducts, GetProductDetails, GetVendorServices } from '../api/VendorApi';

const initialState = {
  token: '',
  data: {},
  profiles: [],
  products: [],
  services: [],
  productDetails: {},
  vendorDetails: { reviews: [], services: [], profile: {} },
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.


export const GetVendorListAsync = createAsyncThunk(
  'vendor/list',
  async (data) => {
    const response = await GetVendors(data.token);
    return response.data;
  }
);

export const GetVendorProductsListAsync = createAsyncThunk(
  'vendor/productslist',
  async (data) => {
    const response = await GetVendorProducts(data.token);
    return response.data;
  }
);

export const GetVendorDetailsAsync = createAsyncThunk(
  'vendor/details',
  async (data) => {
    const response = await GetVendorDetails(data.token, data.id);
    return response.data;
  }
);

export const GetProductDetailsAsync = createAsyncThunk(
  'vendor/productdetails',
  async (data) => {
    const response = await GetProductDetails(data.token, data.productId);
    console.log(response)
    return response.data;
  }
);

export const PostVendorProfileAsync = createAsyncThunk(
  'vendor/new',
  async (data) => {

    const response = await CreateUpdateVendorProfile(data.data, data.token);
    //console.log(response)
    // data.callback()
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const PostVendorProductAsync = createAsyncThunk(
  'vendor/newproduct',
  async (data) => {

    const response = await CreateVendorProductProfile(data.data, data.token);
    data.callback()
    //console.log(response)
    // data.callback()
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const PostVendorServiceAsync = createAsyncThunk(
  'vendor/newservice',
  async (data) => {

    const response = await CreateVendorServices(data.data, data.token);
    data.callback()
    //console.log(response)
    // data.callback()
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const GetVendorServicesListAsync = createAsyncThunk(
  'vendor/servicelist',
  async (data) => {
    const response = await GetVendorServices(data.token);
    return response.data;
  }
);

export const VendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder
      .addCase(GetVendorListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetVendorListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profiles = action.payload.users
        // state.profileData = action.payload.token;
      }).addCase(GetVendorProductsListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetVendorProductsListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products
        // state.profileData = action.payload.token;
      }).addCase(GetVendorDetailsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetVendorDetailsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.vendorDetails = { reviews: action.payload.reviews, services: action.payload.services, profile: action.payload.profile }

      }).addCase(GetProductDetailsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetProductDetailsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      
       state.productDetails = action.payload.details
        // state.profileData = action.payload.token;
      }).addCase(PostVendorProfileAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(PostVendorProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        toast.success(action.payload.message)
        // state.vendorDetails={reviews:action.payload.reviews,services:action.payload.services,profile:action.payload.profile}

      }).addCase(PostVendorProductAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(PostVendorProductAsync.fulfilled, (state, action) => {

        state.status = 'idle';

        toast.success(action.payload.message)

      }).addCase(PostVendorServiceAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(PostVendorServiceAsync.fulfilled, (state, action) => {

        state.status = 'idle';

        toast.success(action.payload.message)

      }).addCase(GetVendorServicesListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(GetVendorServicesListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.services = action.payload.services
        // state.profileData = action.payload.token;
      });
  },
});

export const { } = VendorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getVendors = (state) => state.vendor.profiles;
export const getVendorDetails = (state) => state.vendor.vendorDetails;
export const getVendorProducts = (state) => state.vendor.products;
export const getProductDetails = (state) => state.vendor.productDetails;
export const getVendorServices = (state) => state.vendor.services;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default VendorSlice.reducer;
