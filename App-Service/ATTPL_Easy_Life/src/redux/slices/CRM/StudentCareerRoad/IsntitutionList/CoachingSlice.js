// src/slices/coachingSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations


export const fetchCoachingList =  createAsyncThunk(
  'coaching/fetchCoachingList',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          '/coachingCenterDetails/fetchAll',
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

export const fetchCoaching = createAsyncThunk(
  'coaching/fetchCoaching',
  async (coachingCenterDetailId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          `/coachingCenterDetails/fetch/${coachingCenterDetailId}`,
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

export const deleteCoaching = createAsyncThunk(
  'coaching/deleteCoaching',
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

export const createCombineHarvesterTool = createAsyncThunk(
  'coaching/createCombineHarvesterTool',
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
        '/combineHarvester/create',
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


// Coaching Slice
const coachingSlice = createSlice({
  name: 'coaching',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCoachingList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoachingList.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCoachingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = coachingSlice.actions;
export default coachingSlice.reducer;
