// redux/slices/serviceHistorySlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  serviceHistory: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunks
export const fetchServiceHistory = createAsyncThunk(
  'serviceHistory/fetch',
  async userId => {
    const response = await axios.get(
      `/api/v1/user/fetch/services-history/${userId}`,
    );
    return response.data;
  },
);

// Slice
const serviceHistorySlice = createSlice({
  name: 'serviceHistory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchServiceHistory.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchServiceHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.serviceHistory = action.payload;
      })
      .addCase(fetchServiceHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default serviceHistorySlice.reducer;
