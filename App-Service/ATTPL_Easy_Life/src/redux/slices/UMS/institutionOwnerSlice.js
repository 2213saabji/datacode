// institutionOwnerSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for API calls
export const fetchInstitutionOwners = createAsyncThunk(
  'institutionOwner/fetchInstitutionOwners',
  async () => {
    const response = await axios.get('/api/v1/institutionOwner/fetchAll');
    return response.data;
  },
);

export const fetchInstitutionOwnerById = createAsyncThunk(
  'institutionOwner/fetchInstitutionOwnerById',
  async userId => {
    const response = await axios.get(
      `/api/v1/institutionOwner/fetch/${userId}`,
    );
    return response.data;
  },
);

export const createInstitutionOwner = createAsyncThunk(
  'institutionOwner/createInstitutionOwner',
  async ownerData => {
    const response = await axios.post(
      '/api/v1/institutionOwner/create',
      ownerData,
    );
    return response.data;
  },
);

export const updateInstitutionOwner = createAsyncThunk(
  'institutionOwner/updateInstitutionOwner',
  async ({institutionOwnerId, updateData}) => {
    const response = await axios.put(
      `/api/v1/institutionOwner/update/${institutionOwnerId}`,
      updateData,
    );
    return response.data;
  },
);

export const deleteInstitutionOwner = createAsyncThunk(
  'institutionOwner/deleteInstitutionOwner',
  async institutionOwnerId => {
    await axios.delete(`/api/v1/institutionOwner/delete/${institutionOwnerId}`);
    return institutionOwnerId; // Return the ID for easier state update
  },
);

export const toggleInstitutionOwnerApproval = createAsyncThunk(
  'institutionOwner/toggleInstitutionOwnerApproval',
  async institutionOwnerId => {
    const response = await axios.put(
      `/api/v1/institutionOwner/toggle-approval/${institutionOwnerId}`,
    );
    return response.data;
  },
);

export const verifyInstitutionOwnerDetails = createAsyncThunk(
  'institutionOwner/verifyInstitutionOwnerDetails',
  async ({institutionOwnerId}) => {
    const response = await axios.post(
      `/api/v1/institutionOwner/verifyDetails/${institutionOwnerId}`,
    );
    return response.data;
  },
);

// Create a slice
const institutionOwnerSlice = createSlice({
  name: 'institutionOwner',
  initialState: {
    list: [],
    selectedOwner: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedOwner(state, action) {
      state.selectedOwner = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInstitutionOwners.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchInstitutionOwners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchInstitutionOwners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchInstitutionOwnerById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchInstitutionOwnerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedOwner = action.payload;
      })
      .addCase(fetchInstitutionOwnerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createInstitutionOwner.pending, state => {
        state.status = 'loading';
      })
      .addCase(createInstitutionOwner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(createInstitutionOwner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateInstitutionOwner.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateInstitutionOwner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.list.findIndex(
          owner => owner.userId === action.payload.userId,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateInstitutionOwner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteInstitutionOwner.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteInstitutionOwner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter(
          owner => owner.userId !== action.payload,
        );
      })
      .addCase(deleteInstitutionOwner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(toggleInstitutionOwnerApproval.pending, state => {
        state.status = 'loading';
      })
      .addCase(toggleInstitutionOwnerApproval.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle approval toggling if needed
      })
      .addCase(toggleInstitutionOwnerApproval.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(verifyInstitutionOwnerDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(verifyInstitutionOwnerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle verification success if needed
      })
      .addCase(verifyInstitutionOwnerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setSelectedOwner} = institutionOwnerSlice.actions;
export default institutionOwnerSlice.reducer;
