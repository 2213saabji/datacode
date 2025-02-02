// institutionSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for API calls
export const createInstitution = createAsyncThunk(
  'institution/createInstitution',
  async institutionData => {
    const response = await axios.post(
      '/api/v1/institution/create',
      institutionData,
    );
    return response.data;
  },
);

export const fetchInstitutionList = createAsyncThunk(
  'institution/fetchInstitutionList',
  async () => {
    const response = await axios.get('/api/v1/institution/fetchList');
    return response.data;
  },
);

export const fetchInstitutionById = createAsyncThunk(
  'institution/fetchInstitutionById',
  async institutionId => {
    const response = await axios.get(
      `/api/v1/institution/fetch/${institutionId}`,
    );
    return response.data;
  },
);

export const updateInstitution = createAsyncThunk(
  'institution/updateInstitution',
  async ({institutionId, updateData}) => {
    const response = await axios.put(
      `/api/v1/institution/update/${institutionId}`,
      updateData,
    );
    return response.data;
  },
);

export const deleteInstitution = createAsyncThunk(
  'institution/deleteInstitution',
  async institutionId => {
    await axios.delete(`/api/v1/institution/delete/${institutionId}`);
    return institutionId; // Return the ID for easier state update
  },
);

export const verifyInstitutionDetails = createAsyncThunk(
  'institution/verifyInstitutionDetails',
  async institutionId => {
    const response = await axios.post(
      `/api/v1/institution/verifyDetails/${institutionId}`,
    );
    return response.data;
  },
);

// Create a slice
const institutionSlice = createSlice({
  name: 'institution',
  initialState: {
    list: [],
    selectedInstitution: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedInstitution(state, action) {
      state.selectedInstitution = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createInstitution.pending, state => {
        state.status = 'loading';
      })
      .addCase(createInstitution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(createInstitution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchInstitutionList.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchInstitutionList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchInstitutionList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchInstitutionById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchInstitutionById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedInstitution = action.payload;
      })
      .addCase(fetchInstitutionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateInstitution.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateInstitution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update specific institution in the state
        const index = state.list.findIndex(
          institution => institution.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateInstitution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteInstitution.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteInstitution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter(
          institution => institution.id !== action.payload,
        );
      })
      .addCase(deleteInstitution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(verifyInstitutionDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(verifyInstitutionDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle verification success if needed
      })
      .addCase(verifyInstitutionDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setSelectedInstitution} = institutionSlice.actions;
export default institutionSlice.reducer;
