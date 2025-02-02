import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiCaller from '../../../services/ApiCaller';
import {initializeSocket} from '../CMS/ChatSlice';
import axios from 'axios';
import {object} from 'yup';

// Initial state
const initialState = {
  user: {},
  token: null,
  loading: false,
  error: null,
  message: null,
  isAuthenticated: false,
  open: false,
  openModal: false,
};

//------------------------Auth Specific data start------------------------------

// Thunks for async operations
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, {rejectWithValue, dispatch}) => {
    try {
      const data = await ApiCaller.post('/user/login', loginData, 'ums');
      const token = data.data.data.token;
      await AsyncStorage.setItem('accessToken', token); // Save token
      await dispatch(setAuthenticated(true));
      await dispatch(fetchUserData());
      await dispatch(initializeSocket(token));
      return {token}; // Return only the token for loginUser
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registerData, {rejectWithValue, dispatch}) => {
    try {
      const data = await ApiCaller.post('/user/signup', registerData, 'ums');
      await AsyncStorage.setItem('accessToken', data.data.data.token);
      await dispatch(initializeSocket(data.data.data.token));
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const userAvailability = createAsyncThunk(
  'auth/userAvailability',
  async (number, {rejectWithValue}) => {
    try {
      const data = await ApiCaller.post(
        '/user/search/mobile-number',
        number,
        'ums',
      );
      return data.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const registerForgotPasword = createAsyncThunk(
  'auth/registerForgotPasword',
  async (dataa, {rejectWithValue}) => {
    try {
      const data = await ApiCaller.post('/user/password/new', dataa, 'ums');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const updateScriptData = createAsyncThunk(
  'auth/updateScriptData',
  async ({num, dataa}, {rejectWithValue}) => {
    try {
      const data = await ApiCaller.put(
        `/user/over-ride/user-details/${num}`,
        dataa,
        'ums',
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (passwordData, {rejectWithValue}) => {
    try {
      return await ApiCaller.post(
        '/api/v1/user/password/new',
        passwordData,
        'ums',
      );
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchUserFromPhone = createAsyncThunk(
  'auth/fetchUserFromPhone',
  async (phone, {rejectWithValue}) => {
    try {
      return await ApiCaller.post(
        // `/user/fetch/userId/userProfileId/${phone}`,
        '/user/search/mobile-number',
        {phone},
        'ums',
      );
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// New thunk to fetch user data using the access token
export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('No token found');
      const response = await ApiCaller.get('/user/profile/fetch', 'ums', token);
      return response.data.data; // Return user data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchUserDataById = createAsyncThunk(
  'auth/fetchUserData',
  async ({userId}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.get(`/user/user-profile-details/fetch/${userId}`, 'ums');
      return response?.data?.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const UpdateUserProfile = createAsyncThunk(
  'auth/UpdateUserProfile',
  async ({userId, userProfileId, data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.put(
        `/user/update/user-profile-details/${userId}/${userProfileId}`,
        data,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const UpdateUserAddress = createAsyncThunk(
  'auth/UpdateUserAddress',
  async ({userId, userAddressId, data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.put(
        `/user/update/user-addresses/${userId}/${userAddressId}`,
        data,
        'ums',
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const ChangePassword = createAsyncThunk(
  'auth/ChangePassword',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        `/user/password/updatePassword`,
        data,
        'ums',
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const PaymentStatusGetter = createAsyncThunk(
  'auth/PaymentStatusGetter',
  async ({}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.get(`/user/fetch/payment-page/status`,'ums');
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const checkPayment = createAsyncThunk(
  'auth/checkPayment',
  async ({phone}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.get(`/order/findByPhone/${phone}`,'expms');
      return response; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);



//------------------------Auth Specific data Close------------------------------

// ------------------------Baisc Data start------------------------------------

export const fetchPartyList = createAsyncThunk(
  'auth/fetchPartyList',
  async (_, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.get('/party/fetchAll', 'ems');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const UserPincodeData = createAsyncThunk(
  'auth/UserPincodeData',
  async ({postalCode}, {rejectWithValue}) => {
    const URL = `https://api.postalpincode.in/pincode/${postalCode}`;
    try {
      const response = await axios.get(URL);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const FetchServiceHistory = createAsyncThunk(
  'auth/FetchServiceHistory',
  async ({userId}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.get(
        `/user/fetch/services-history/${userId}`,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const FetchProductRolesList = createAsyncThunk(
  'auth/FetchProductRolesList',
  async ({}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.get(
        `/user/product-details/fetchAll`,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const UserRoleGetter = createAsyncThunk(
  'auth/UserRoleGetter',
  async ({ProdId}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.get(
        `/user/user-role/fetchAll/product-based/${ProdId}`,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const createOrder = createAsyncThunk(
  'auth/createOrder',
  async ({amount, phoneNumber}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        `/order/create`,
        {amount, phoneNumber},
        'expms',
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ------------------------Baisc Data close------------------------------------

// ------------------------Upgrade Account Start------------------------------------
// ------------------------Doctor View Start------------------------------------

export const RequestDoctorForm = createAsyncThunk(
  'auth/RequestDoctorForm',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        `/user/create/doctor-details`,
        data,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ------------------------Doctor View Close------------------------------------

// ------------------------Employer View Start------------------------------------

export const RequestEmployerForm = createAsyncThunk(
  'auth/RequestEmployerForm',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        `/user/employer/create`,
        data,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ------------------------Employer View Close------------------------------------

// ------------------------InstitutionOwner View Start------------------------------------

export const RequestInstitutionOwnerForm = createAsyncThunk(
  'auth/RequestInstitutionOwnerForm',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        `/institutionOwner/create`,
        data,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ------------------------InstitutionOwner View Close------------------------------------

// ------------------------AgricultureEquipmentSeller View Start------------------------------------

export const RequestAgricultureEquipmentSellerForm = createAsyncThunk(
  'auth/RequestAgricultureEquipmentSellerForm',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(`/sellerOwner/create`, data, 'ums');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ------------------------AgricultureEquipmentSeller View Close------------------------------------

// ------------------------Businessman View Start------------------------------------

export const RequestBusinessmanForm = createAsyncThunk(
  'auth/RequestBusinessmanForm',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        `/user/businessman/create`,
        data,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ------------------------Businessman View Close------------------------------------

// ------------------------ServiceProvider View Start------------------------------------

export const RequestServiceProviderForm = createAsyncThunk(
  'auth/RequestServiceProviderForm',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(`/provider/create`, data, 'ums');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ------------------------ServiceProvider View Close------------------------------------

// ------------------------Driver View Start------------------------------------

export const RequestDriverForm = createAsyncThunk(
  'auth/RequestDriverForm',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        `/driverUMS/createWithVehicle`,
        data,
        'ums',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ------------------------Driver View Close------------------------------------


// ------------------------Upgrade Account close------------------------------------

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = {};
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('accessToken');
    },
    paymentPopupClose: (state, action) => {
      state.openModal=false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload; 
    },
    toggleOpenModal: (state, action) => {
       state.openModal=state.open;
    },
    
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Only set the token from login
        state.message = 'Login successful';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserFromPhone.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFromPhone.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchUserFromPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = state.token || action.meta.arg; // Update token if available in meta.arg
        state.isAuthenticated = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerForgotPasword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerForgotPasword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateScriptData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateScriptData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPartyList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartyList.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchPartyList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UpdateUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(UpdateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UpdateUserAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUserAddress.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(UpdateUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ChangePassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(FetchServiceHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchServiceHistory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(FetchServiceHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Load token on startup
export const initializeAuth = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      await dispatch(setToken(token));
      await dispatch(fetchUserData());
      await dispatch(initializeSocket(token));
    } else {
      await dispatch(setAuthenticated(false));
    }
  } catch (error) {
    console.error('Failed to initialize auth:', error);
    await dispatch(setAuthenticated(false));
  }
};


export const {logout, setAuthenticated, setToken, paymentPopupClose,setOpen,toggleOpenModal} = authSlice.actions;
export default authSlice.reducer;
