// src/slices/collegeSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations


export const fetchCollegeList =  createAsyncThunk(
  'college/fetchCollegeList',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          '/collegeDetails/fetchAll',
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

export const fetchCollege = createAsyncThunk(
  'college/fetchCollege',
  async (collegeDetailId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          `/collegeDetails/fetch/${collegeDetailId}`,
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

export const deleteCollege = createAsyncThunk(
  'college/deleteCollege',
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
  'college/createCombineHarvesterTool',
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


// College Slice
const collegeSlice = createSlice({
  name: 'college',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCollegeList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollegeList.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCollegeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = collegeSlice.actions;
export default collegeSlice.reducer;
