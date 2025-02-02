// src/slices/schoolSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations


export const fetchSchoolList =  createAsyncThunk(
  'school/fetchSchoolList',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          '/schoolDetails/fetchAll',
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

export const fetchSchool = createAsyncThunk(
  'school/fetchSchool',
  async (schoolDetailId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          `/schoolDetails/fetch/${schoolDetailId}`,
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

export const deleteSchool = createAsyncThunk(
  'school/deleteSchool',
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
  'school/createCombineHarvesterTool',
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


// Job Slice
const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSchoolList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolList.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchSchoolList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = schoolSlice.actions;
export default schoolSlice.reducer;
