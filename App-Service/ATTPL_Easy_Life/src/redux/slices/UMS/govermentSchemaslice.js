// businessmanDetailsSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import ApiCaller from '../../../services/ApiCaller';


// Async thunks for API calls
export const fetchGovermentSchemaCards = createAsyncThunk(
  'govermentSchema/fetchGovermentSchemaCards',
  async ({cards}) => {
    const response = await ApiCaller.get(`/routes/fetch/${cards}`, 'bms')
    return response.data;
  },
);

export const updateBusinessmanDetails = createAsyncThunk(
  'businessmanDetails/updateBusinessmanDetails',
  async ({businessmanId, updateData}) => {
    const response = await axios.put(
      `/api/v1/user/businessman/update/${businessmanId}`,
      updateData,
    );
    return response.data;
  },
);

export const createBusinessmanDetails = createAsyncThunk(
  'businessmanDetails/createBusinessmanDetails',
  async businessmanData => {
    const response = await axios.post(
      '/api/v1/user/businessman/create',
      businessmanData,
    );
    return response.data;
  },
);

export const fetchAllBusinessmen = createAsyncThunk(
  'businessmanDetails/fetchAllBusinessmen',
  async () => {
    const response = await axios.get('/api/v1/user/businessman/fetch-All');
    return response.data;
  },
);

export const deleteBusinessmanDetails = createAsyncThunk(
  'businessmanDetails/deleteBusinessmanDetails',
  async businessmanId => {
    const response = await axios.delete(
      `/api/v1/user/businessman/delete/${businessmanId}`,
    );
    return businessmanId; // Return the ID for easier state update
  },
);

export const verifyBusinessmanDetails = createAsyncThunk(
  'businessmanDetails/verifyBusinessmanDetails',
  async ({verificationToken, licenseNumber}) => {
    const response = await axios.put(
      '/api/v1/user/verify/profession-details/businessman',
      {
        verificationToken,
        licenseNumber,
      },
    );
    return response.data;
  },
);

// Create a slice
const govermentSchemaSlice = createSlice({
  name: 'govermentSchemaDetails',
  initialState: {
    data: [],
    selectedBusinessman: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedBusinessman(state, action) {
      state.selectedBusinessman = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGovermentSchemaCards.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchGovermentSchemaCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBusinessman = action.payload;
      })
      .addCase(fetchGovermentSchemaCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBusinessmanDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateBusinessmanDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update specific businessman details in the state
        const index = state.data.findIndex(
          businessman => businessman.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateBusinessmanDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBusinessmanDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(createBusinessmanDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(createBusinessmanDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllBusinessmen.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllBusinessmen.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllBusinessmen.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBusinessmanDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteBusinessmanDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(
          businessman => businessman.id !== action.payload,
        );
      })
      .addCase(deleteBusinessmanDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setSelectedBusinessman} = govermentSchemaSlice.actions;
export default govermentSchemaSlice.reducer;
