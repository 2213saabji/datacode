// schoolDetailsSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for API calls
export const createSchoolDetails = createAsyncThunk(
  'schoolDetails/createSchoolDetails',
  async schoolData => {
    const response = await axios.post(
      '/api/v1/schoolDetails/create',
      schoolData,
    );
    return response.data;
  },
);

export const fetchAllSchoolDetails = createAsyncThunk(
  'schoolDetails/fetchAllSchoolDetails',
  async () => {
    const response = await axios.get('/api/v1/schoolDetails/fetchAll');
    return response.data;
  },
);

export const fetchSchoolDetailById = createAsyncThunk(
  'schoolDetails/fetchSchoolDetailById',
  async schoolDetailId => {
    const response = await axios.get(
      `/api/v1/schoolDetails/fetch/${schoolDetailId}`,
    );
    return response.data;
  },
);

export const updateSchoolDetails = createAsyncThunk(
  'schoolDetails/updateSchoolDetails',
  async ({schoolDetailId, updateData}) => {
    const response = await axios.put(
      `/api/v1/schoolDetails/update/${schoolDetailId}`,
      updateData,
    );
    return response.data;
  },
);

export const deleteSchoolDetail = createAsyncThunk(
  'schoolDetails/deleteSchoolDetail',
  async schoolDetailId => {
    await axios.delete(`/api/v1/schoolDetails/delete/${schoolDetailId}`);
    return schoolDetailId; // Return the ID for easier state update
  },
);

export const uploadSchoolImages = createAsyncThunk(
  'schoolDetails/uploadSchoolImages',
  async formData => {
    const response = await axios.post(
      '/api/v1/schoolDetails/upload-images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
);

// Create a slice
const schoolDetailsSlice = createSlice({
  name: 'schoolDetails',
  initialState: {
    data: [],
    selectedSchoolDetail: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedSchoolDetail(state, action) {
      state.selectedSchoolDetail = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createSchoolDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(createSchoolDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(createSchoolDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllSchoolDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllSchoolDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllSchoolDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSchoolDetailById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSchoolDetailById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedSchoolDetail = action.payload;
      })
      .addCase(fetchSchoolDetailById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSchoolDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateSchoolDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update specific school details in the state
        const index = state.data.findIndex(
          school => school.id === action.payload.id,
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateSchoolDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteSchoolDetail.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteSchoolDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(school => school.id !== action.payload);
      })
      .addCase(deleteSchoolDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadSchoolImages.pending, state => {
        state.status = 'loading';
      })
      .addCase(uploadSchoolImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle image upload success if needed
      })
      .addCase(uploadSchoolImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setSelectedSchoolDetail} = schoolDetailsSlice.actions;
export default schoolDetailsSlice.reducer;
