// src/slices/jobSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../services/ApiCaller';

// Initial state
const initialState = {
    Ambulances: [],
    Ambulance:null,
    loading: false,
    error: null,
    message: null,
};

// Thunks for async operations
export const fetchAmbulanceDetails = createAsyncThunk(
  'ambulancebooking/fetchBookedAmbulance',
  async (_, {getState, rejectWithValue}) => {
    try {
     
      const {auth} = getState();
      const accessToken = auth.token;
      if (accessToken) {
    
        const response = await ApiCaller.get('trip/fetchAll/ambulance', 'tms', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        const res = await response;
       
        return res?.data?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const fetchsAmbulanceDetail = createAsyncThunk(
  'Ambulances/fetchBookedAmbulance',
  async ({tripId}, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      if (accessToken) {
       
        const response = await ApiCaller.get(`trip/ambulance/fetch/${tripId}`, 'tms', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
         const res = await response;
       
        return res ?.data?.data;
      }
      
        
      
    } catch (error) {
      console.log("errorbox")
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const deleteAmbulanceDetails = createAsyncThunk(
  'Ambulances/deleteAmbulanceDetails',
  async (AmbulanceId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.delete(`/trip/delete/${AmbulanceId}`, 'tms', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        const res = await response;
        
        
        return res?.data?.data;

      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const otpverifyTMS = createAsyncThunk(
  'ambulances/otpverifyTMS',
  async ({ mobileOtp, otpCodeId }, { rejectWithValue }) => {
    try {
      const mobileOtpAndSmsIdToSend = { otpCode: mobileOtp, otpCodeId };
      const URL = `${ATTPL_OTP_HOST_API}${endpoints.otp.verify}`;
      const response = await ApiCaller.post(URL, mobileOtpAndSmsIdToSend);
      
      if (response.data.success) {
        return { response: 'ok' };
      }
      throw new Error('OTP verification failed');
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const createAmbulanceBooking = createAsyncThunk(
  'Ambulances/createAmbulanceBooking',
  async (formData, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      const response = await ApiCaller.post(
        'trip/ambulance/create',
        formData,
        'tms',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const updateAmbulanceBooking = createAsyncThunk(
  'Ambulances/updateAmbulanceDetails',
  async ({tripId, data}, {getState,rejectWithValue}) => {
    
    
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      const response = await ApiCaller.put(
        `trip/update/ambulance/${tripId}`,
        data,
        'tms',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

// Job Slice
const ambulanceSlice = createSlice({
  name: 'Ambulances',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAmbulanceDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmbulanceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.Ambulances = action.payload;
      })
      .addCase(fetchAmbulanceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchsAmbulanceDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchsAmbulanceDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.Ambulance = action.payload;
      })
      .addCase(fetchsAmbulanceDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(otpverifyTMS.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otpverifyTMS.fulfilled, (state, action) => {
        state.loading = false;
        // Handle success if needed
      })
      .addCase(otpverifyTMS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(createAmbulanceBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAmbulanceBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.Ambulances.push(action.payload);
      })
      .addCase(createAmbulanceBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAmbulanceBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAmbulanceBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.Ambulances.findIndex(trip => trip.id === action.payload.tripId);
        if (index !== -1) {
          state.Ambulances[index] = action.payload;
        }
      })
      .addCase(updateAmbulanceBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAmbulanceDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAmbulanceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.Ambulances = action.payload;
      })
      .addCase(deleteAmbulanceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = ambulanceSlice.actions;
export default ambulanceSlice.reducer;
