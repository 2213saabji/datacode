import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../services/ApiCaller';

// Initial state
const initialState = {
  otpCodeId: null,
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations
export const generateEmailOtp = createAsyncThunk(
  'emailOtp/generateEmailOtp',
  async (receiverEmail, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post('/api/v1/email/otp/generate', {
        receiverEmail,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const verifyEmailOtp = createAsyncThunk(
  'emailOtp/verifyEmailOtp',
  async ({otpCode, otpCodeId}, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post('/api/v1/email/otp/verify', {
        otpCode,
        otpCodeId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

// Email OTP Slice
const emailOtpSlice = createSlice({
  name: 'emailOtp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(generateEmailOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateEmailOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpCodeId = action.payload.data.otpCodeId;
        state.message = action.payload.message;
      })
      .addCase(generateEmailOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmailOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyEmailOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default emailOtpSlice.reducer;
