// src/slices/modernAgriToolSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations

export const fetchModernAgriTools =  createAsyncThunk(
    'modern/fetchModernAgriTools',
    async (_, {getState, rejectWithValue}) => {
      try {
        const {auth} = getState();
        const accessToken = auth.token;
        
        if (accessToken) {
          const response = await ApiCaller.get(
            '/modernAgriTools/fetchAll',
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


export const fetchModernAgriTool = createAsyncThunk(
  'modern/fetchModernAgriTool',
  async (modernAgriToolId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          `/modernAgriTools/fetch/${modernAgriToolId}`,
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



export const createModernAgriTool = createAsyncThunk(
  'modern/createModernAgriTool',
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
        '/modernAgriTools/create',
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

export const deleteModernAgriTool = createAsyncThunk(
  'modern/deleteModernAgriTool',
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
const modernAgriToolSlice = createSlice({
  name: 'modern',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchModernAgriTools.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModernAgriTools.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchModernAgriTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = modernAgriToolSlice.actions;
export default modernAgriToolSlice.reducer;
