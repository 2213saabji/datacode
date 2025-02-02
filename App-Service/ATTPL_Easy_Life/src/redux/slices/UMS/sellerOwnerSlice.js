// redux/slices/sellerOwnerSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = '/api/v1/sellerOwner';

// Async Thunks
export const fetchSellerOwnerList = createAsyncThunk(
  'sellerOwners/fetchList',
  async () => {
    const response = await axios.get(`${API_URL}/fetchList`);
    return response.data;
  },
);

export const fetchSellerOwnerById = createAsyncThunk(
  'sellerOwners/fetchById',
  async userId => {
    const response = await axios.get(`${API_URL}/fetch/${userId}`);
    return response.data;
  },
);

export const createSellerOwner = createAsyncThunk(
  'sellerOwners/create',
  async sellerOwnerData => {
    const response = await axios.post(`${API_URL}/create`, sellerOwnerData);
    return response.data;
  },
);

export const updateSellerOwner = createAsyncThunk(
  'sellerOwners/update',
  async ({userId, sellerOwnerData}) => {
    const response = await axios.put(
      `${API_URL}/update/${userId}`,
      sellerOwnerData,
    );
    return response.data;
  },
);

export const deleteSellerOwner = createAsyncThunk(
  'sellerOwners/delete',
  async userId => {
    const response = await axios.delete(`${API_URL}/delete/${userId}`);
    return userId;
  },
);

export const toggleApproval = createAsyncThunk(
  'sellerOwners/toggleApproval',
  async userId => {
    const response = await axios.put(`${API_URL}/toggleApproval/${userId}`);
    return response.data;
  },
);

export const verifySellerOwnerDetails = createAsyncThunk(
  'sellerOwners/verifyDetails',
  async userId => {
    const response = await axios.post(`${API_URL}/verifyDetails/${userId}`);
    return response.data;
  },
);

// Slice
const sellerOwnerSlice = createSlice({
  name: 'sellerOwners',
  initialState: {
    list: [],
    currentSellerOwner: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSellerOwnerList.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSellerOwnerList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSellerOwnerList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSellerOwnerById.fulfilled, (state, action) => {
        state.currentSellerOwner = action.payload;
      })
      .addCase(createSellerOwner.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateSellerOwner.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          owner => owner.userId === action.payload.userId,
        );
        if (index >= 0) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteSellerOwner.fulfilled, (state, action) => {
        state.list = state.list.filter(
          owner => owner.userId !== action.payload,
        );
      });
  },
});

export default sellerOwnerSlice.reducer;
