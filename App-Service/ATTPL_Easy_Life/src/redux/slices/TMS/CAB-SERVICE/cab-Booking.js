// src/slices/jobSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../services/ApiCaller';

// Initial state
const initialState = {
  cabs: [],
 loading: false,
  error: null,
  message: null,
};

// Thunks for async operations
export const fetchCabDetails = createAsyncThunk(
  'cabbooking/fetchBookedVehicals',
  async (_, {getState, rejectWithValue}) => {
    try {
     
      const {auth} = getState();
      const accessToken = auth.token;
      if (accessToken) {
       
        const response = await ApiCaller.get('cab-request/trip/fetchAll', 'tms', {
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

export const fetchsingleCabDetail = createAsyncThunk(
  'jobs/fetchLabourJob',
  async ({cabId}, {getState, rejectWithValue}) => {
    try {
        const response = await ApiCaller.get(
          `cab-request/trip/fetchSingle/${cabId}`,
          'tms',
        );
        
        return response?.data?.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const deleteCabDetails = createAsyncThunk(
  'cabs/deleteCabDetails',
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

// /vehicle-option/fetchAll/Cab%20Service

export const fetchVehicleOptions = createAsyncThunk(
  'cabs/fetchVehicleOptions',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      if (accessToken) {
        const response = await ApiCaller.get('/vehicle-option/fetchAll/Cab Service', 'tms', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        return response.data.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

// export const fetchJobTypeCategory = createAsyncThunk(
//   'jobs/fetchJobTypeCategory',
//   async (jobType, {getState, rejectWithValue}) => {
//     try {
//       const {auth} = getState();
//       const accessToken = auth.token;

//       if (accessToken) {
//         const response = await ApiCaller.get(
//           `/jobCategory/fetch/${jobType}`,
//           'tms',
//           {
//             headers: {Authorization: `Bearer ${accessToken}`},
//           },
//         );
        
//         return response.data.data;
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data.message || error.message);
//     }
//   },
// );

export const createCabBooking = createAsyncThunk(
  'cabs/createCabBooking',
  async (formData, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      const response = await ApiCaller.post(
        'cab-request/trip/create',
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

export const updateCabBooking = createAsyncThunk(
  'cabs/updateCabDetails',
  async ({cabId, data}, {getState,rejectWithValue}) => {
    
    
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      const response = await ApiCaller.put(
        `cab-request/trip/update/${cabId}`,
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
const cabSlice = createSlice({
  name: 'cabs',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCabDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCabDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cabs = action.payload;
      })
      .addCase(fetchCabDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchLabourJobType.pending, state => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchLabourJobType.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.jobs = action.payload;
      // })
      // .addCase(fetchLabourJobType.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      .addCase(createCabBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCabBooking .fulfilled, (state, action) => {
        state.loading = false;
        state.cabs.push(action.payload);
      })
      .addCase(createCabBooking .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCabBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCabBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.jobs.findIndex(job => job.id === action.payload.id);
        if (index !== -1) {
          state.cabs[index] = action.payload;
        }
      })
      .addCase(updateCabBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCabDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCabDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cabs = action.payload;
      })
      .addCase(deleteCabDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = cabSlice.actions;
export default cabSlice.reducer;
