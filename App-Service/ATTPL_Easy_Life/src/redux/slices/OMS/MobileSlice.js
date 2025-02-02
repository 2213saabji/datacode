import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../services/ApiCaller';

// Initial state
const initialState = {
  otpCodeId: null,
  refId:null,
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations
export const generateMobileOtp = createAsyncThunk(
  'mobileOtp/generateMobileOtp',
  async (mobileNumber, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        '/otp/generate',
        {
          mobileNumber,
        },
        'otp',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const verifyMobileOtp = createAsyncThunk(
  'mobileOtp/verifyMobileOtp',
  async (otpdata, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        '/otp/verify',
        otpdata,
        'otp',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

// Mobile OTP Slice
const mobileOtpSlice = createSlice({
  name: 'mobileOtp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(generateMobileOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateMobileOtp.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload.data)
        state.otpCodeId = action.payload.data.otpCodeId;
        state.refId = action.payload.data.refId;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(generateMobileOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyMobileOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyMobileOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(verifyMobileOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mobileOtpSlice.reducer;
