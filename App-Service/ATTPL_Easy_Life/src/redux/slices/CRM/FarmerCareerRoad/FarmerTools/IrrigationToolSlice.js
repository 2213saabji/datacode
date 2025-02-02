// src/slices/irrigationToolSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations

export const fetchIrrigationTools =  createAsyncThunk(
  'irrigation/fetchIrrigationTools',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          '/irrigationSystemDetails/fetchAll',
          'cms',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );
      
        const res = await response;
        
        return res?.data?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const fetchIrrigationTool = createAsyncThunk(
    'irrigation/fetchIrrigationTool',
    async (irrigationSystemId, {getState, rejectWithValue}) => {
      try {
        const {auth} = getState();
        const accessToken = auth.token;
        
        if (accessToken) {
          const response = await ApiCaller.get(
            `/irrigationSystemDetails/fetch/${irrigationSystemId}`,
            'cms',
            {
              headers: {Authorization: `Bearer ${accessToken}`},
            },
          );
          const res = await response;
          
          return res?.data?.data;
        }
      } catch (error) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
    },
  );


export const createIrrigationTool = createAsyncThunk(
    'irrigation/createIrrigationTool',
    async (formData, {getState, rejectWithValue}) => {
      try {
        const {auth} = getState();
        const updatedData = {
          ...formData,
          state: auth?.user?.UserAddressesses?.[0].userState,
          city: auth?.user?.UserAddressesses?.[0].userCity,
          district: auth?.user?.UserAddressesses?.[0].panchayatName,
          tehsil: auth?.user?.UserAddressesses?.[0].panchayatName
        }
        const accessToken = auth.token;
        const response = await ApiCaller.post(
          '/irrigationSystemDetails/create',
          updatedData,
          'cms',
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


export const deleteIrrigationTool = createAsyncThunk(
  'irrigation/deleteIrrigationTool',
  async (appointmentId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.delete(`/agricultureAppointment/delete/${appointmentId}`, 'cms', {
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


// Job Slice
const irrigationToolSlice = createSlice({
  name: 'irrigation',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIrrigationTools.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIrrigationTools.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchIrrigationTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = irrigationToolSlice.actions;
export default irrigationToolSlice.reducer;
