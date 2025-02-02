// redux/slices/sellerSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = '/api/v1/seller';

// Async Thunks
export const fetchSellerList = createAsyncThunk(
  'sellers/fetchList',
  async () => {
    const response = await axios.get(`${API_URL}/fetchList`);
    return response.data;
  },
);

export const fetchSellerById = createAsyncThunk(
  'sellers/fetchById',
  async sellerId => {
    const response = await axios.get(`${API_URL}/fetch/${sellerId}`);
    return response.data;
  },
);

export const createSeller = createAsyncThunk(
  'sellers/create',
  async sellerData => {
    const response = await axios.post(`${API_URL}/create`, sellerData);
    return response.data;
  },
);

export const updateSeller = createAsyncThunk(
  'sellers/update',
  async ({sellerId, sellerData}) => {
    const response = await axios.put(
      `${API_URL}/update/${sellerId}`,
      sellerData,
    );
    return response.data;
  },
);

export const deleteSeller = createAsyncThunk(
  'sellers/delete',
  async sellerId => {
    const response = await axios.delete(`${API_URL}/delete/${sellerId}`);
    return sellerId;
  },
);

export const verifySellerDetails = createAsyncThunk(
  'sellers/verifyDetails',
  async sellerId => {
    const response = await axios.post(`${API_URL}/verifyDetails/${sellerId}`);
    return response.data;
  },
);

// Slice
const sellerSlice = createSlice({
  name: 'sellers',
  initialState: {
    list: [],
    currentSeller: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSellerList.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSellerList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSellerList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.currentSeller = action.payload;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          seller => seller.sellerOwnerId === action.payload.sellerOwnerId,
        );
        if (index >= 0) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.list = state.list.filter(
          seller => seller.sellerOwnerId !== action.payload,
        );
      });
  },
});

export default sellerSlice.reducer;
