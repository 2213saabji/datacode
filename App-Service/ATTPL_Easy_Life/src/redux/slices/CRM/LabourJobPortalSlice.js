// src/slices/jobSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../services/ApiCaller';

// Initial state
const initialState = {
  jobs: [],
  jobTypes: [],
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations
export const fetchLabourJobs = createAsyncThunk(
  'jobs/fetchLabourJobs',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      if (accessToken) {
        const response = await ApiCaller.get('/jobPost/fetchAll', 'tms', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        const res = await response;
        return res?.data?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const fetchLabourJob = createAsyncThunk(
  'jobs/fetchLabourJob',
  async (jobPostId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          `/jobPost/fetch/${jobPostId}`,
          'tms',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );
        const res = await response;
        console.log("000000000>>>", res);
        
        return res?.data?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const deleteLabourJob = createAsyncThunk(
  'jobs/deleteLabourJob',
  async (jobPostId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.delete(`/jobPost/delete/${jobPostId}`, 'tms', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        const res = await response;
        console.log("delete==>", res);
        
        return res?.data?.data;

      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const fetchLabourJobType = createAsyncThunk(
  'jobs/fetchLabourJobType',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      if (accessToken) {
        const response = await ApiCaller.get('/jobTypes/fetchAll', 'tms', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        return response.data.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const fetchJobTypeCategory = createAsyncThunk(
  'jobs/fetchJobTypeCategory',
  async (jobType, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/jobCategory/fetch/${jobType}`,
          'tms',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );
        console.log('jobTypeCategory====>', response.data.data);
        return response.data.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const createLabourJob = createAsyncThunk(
  'jobs/createLabourJob',
  async (formData, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      const response = await ApiCaller.post(
        '/jobPost/create',
        formData,
        'tms',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const updateLabourJob = createAsyncThunk(
  'jobs/updateLabourJob',
  async ({jobId, data}, {getState,rejectWithValue}) => {
    console.log("slice", jobId,"+",data);
    
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      const response = await ApiCaller.put(
        `/jobPost/update/${jobId}`,
        data,
        'tms',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

// Job Slice
const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLabourJobs.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabourJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchLabourJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLabourJobType.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabourJobType.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchLabourJobType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLabourJob.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLabourJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createLabourJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLabourJob.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLabourJob.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.jobs.findIndex(job => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateLabourJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLabourJob.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLabourJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(deleteLabourJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = jobSlice.actions;
export default jobSlice.reducer;
