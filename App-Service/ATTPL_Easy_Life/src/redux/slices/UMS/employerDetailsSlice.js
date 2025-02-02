// employerDetailsSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for API calls
export const fetchAllEmployers = createAsyncThunk(
  'employerDetails/fetchAllEmployers',
  async () => {
    const response = await axios.get('/api/v1/user/employer/fetch-All');
    return response.data;
  },
);

export const fetchSingleEmployer = createAsyncThunk(
  'employerDetails/fetchSingleEmployer',
  async employerId => {
    const response = await axios.get(
      `/api/v1/user/employer/fetch/${employerId}`,
    );
    return response.data;
  },
);

export const updateEmployerDetails = createAsyncThunk(
  'employerDetails/updateEmployerDetails',
  async ({employerDetailsId, updateData}) => {
    const response = await axios.put(
      `/api/v1/user/employer/update/${employerDetailsId}`,
      updateData,
    );
    return response.data;
  },
);

export const createEmployerDetails = createAsyncThunk(
  'employerDetails/createEmployerDetails',
  async employerData => {
    const response = await axios.post(
      '/api/v1/user/employer/create',
      employerData,
    );
    return response.data;
  },
);

export const fetchEmployerRequests = createAsyncThunk(
  'employerDetails/fetchEmployerRequests',
  async () => {
    const response = await axios.get(
      '/api/v1/user/employer/requests/fetch-All',
    );
    return response.data;
  },
);

export const deleteEmployerDetails = createAsyncThunk(
  'employerDetails/deleteEmployerDetails',
  async employerDetailsId => {
    const response = await axios.delete(
      `/api/v1/user/employer/delete/${employerDetailsId}`,
    );
    return employerDetailsId; // Return the ID for easier state update
  },
);

// Create a slice
const employerDetailsSlice = createSlice({
  name: 'employerDetails',
  initialState: {
    data: [],
    selectedEmployer: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedEmployer(state, action) {
      state.selectedEmployer = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllEmployers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllEmployers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllEmployers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSingleEmployer.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSingleEmployer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEmployer = action.payload;
      })
      .addCase(fetchSingleEmployer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEmployerDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateEmployerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update specific employer details in the state
        const index = state.data.findIndex(
          employer => employer.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateEmployerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createEmployerDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(createEmployerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(createEmployerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEmployerRequests.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEmployerRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle requests if needed
      })
      .addCase(fetchEmployerRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteEmployerDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteEmployerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(
          employer => employer.id !== action.payload,
        );
      })
      .addCase(deleteEmployerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setSelectedEmployer} = employerDetailsSlice.actions;
export default employerDetailsSlice.reducer;
