// src/slices/cultivationToolSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations

export const fetchCultivationTools =  createAsyncThunk(
  'cultivation/fetchCultivationTools',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          '/cultivationEquipment/fetchAll',
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

export const fetchCultivationTool = createAsyncThunk(
    'cultivation/fetchCultivationTool',
    async (cultivationEquipmentId, {getState, rejectWithValue}) => {
      try {
        const {auth} = getState();
        const accessToken = auth.token;
        
        if (accessToken) {
          const response = await ApiCaller.get(
            `/cultivationEquipment/fetch/${cultivationEquipmentId}`,
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


export const createCultivationTool = createAsyncThunk(
    'cultivation/createCultivationTool',
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
          '/cultivationEquipment/create',
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


export const deleteCultivationTool = createAsyncThunk(
  'cultivation/deleteCultivationTool',
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
const cultivationToolSlice = createSlice({
  name: 'cultivation',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCultivationTools.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCultivationTools.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCultivationTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = cultivationToolSlice.actions;
export default cultivationToolSlice.reducer;
