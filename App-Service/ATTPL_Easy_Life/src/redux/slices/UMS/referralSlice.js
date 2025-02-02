import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  referralToken: null,
  availableRedemptions: [],
  loading: false,
  error: null,
};

// Thunks
export const generateReferralToken = createAsyncThunk(
  'referral/generateReferralToken',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('/api/v1/user/voter-referral', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust token retrieval as needed
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchAvailableRedemptions = createAsyncThunk(
  'referral/fetchAvailableRedemptions',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('/api/v1/user/available-redemptions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust token retrieval as needed
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Slice
const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(generateReferralToken.pending, state => {
        state.loading = true;
      })
      .addCase(generateReferralToken.fulfilled, (state, action) => {
        state.loading = false;
        state.referralToken = action.payload.data;
      })
      .addCase(generateReferralToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAvailableRedemptions.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAvailableRedemptions.fulfilled, (state, action) => {
        state.loading = false;
        state.availableRedemptions = action.payload;
      })
      .addCase(fetchAvailableRedemptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default referralSlice.reducer;
