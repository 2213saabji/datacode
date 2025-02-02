// src/slices/tractorSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations


export const fetchTractors =  createAsyncThunk(
  'tractor/fetchTractors',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          '/tractorDetails/fetchAll',
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

export const fetchTractorTool = createAsyncThunk(
  'tractor/fetchTractorTool',
  async (tractorId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          `/tractorDetails/fetch/${tractorId}`,
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

export const createTractorTool = createAsyncThunk(
  'tractor/createTractorTool',
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
        '/tractorDetails/create',
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

export const deleteTractor = createAsyncThunk(
  'tractor/deleteTractor',
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
const tractorSlice = createSlice({
  name: 'tractor',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTractors.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTractors.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchTractors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = tractorSlice.actions;
export default tractorSlice.reducer;
