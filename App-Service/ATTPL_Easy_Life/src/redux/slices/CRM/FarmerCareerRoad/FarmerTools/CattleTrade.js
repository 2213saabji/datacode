// src/slices/cattleSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations


export const fetchCattlesList =  createAsyncThunk(
  'cattle/fetchCattlesList',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          '/cattleDetails/fetchAll',
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

export const fetchCattlesTypeList =  createAsyncThunk(
  'cattle/fetchCattlesTypeList',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          '/cattleTypeDetails/fetchAll',
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

export const fetchCattle = createAsyncThunk(
  'cattle/fetchCattle',
  async (cattleTypeId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          `/cattleTypeDetails/fetch/${cattleTypeId}`,
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

export const fetchCattleUser = createAsyncThunk(
  'cattle/fetchCattleUser',
  async (cattleId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      
      if (accessToken) {
        const response = await ApiCaller.get(
          `/cattleDetails/fetch/${cattleId}`,
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

// export const createCattleTrade = createAsyncThunk(
//   'cattle/createCattleTrade',
//   async (formData, {getState, rejectWithValue}) => {
//     try {
//       const {auth} = getState();
//       const updatedData = {
//         ...formData,
//         state: auth?.user?.UserAddressesses?.[0].userState,
//         city: auth?.user?.UserAddressesses?.[0].userCity,
//         district: auth?.user?.UserAddressesses?.[0].panchayatName,
//         tehsil: auth?.user?.UserAddressesses?.[0].panchayatName
//       }
//       const accessToken = auth.token;
//       const response = await ApiCaller.post(
//         '/tractorDetails/create',
//         updatedData,
//         'cms',
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data.message || error.message);
//     }
//   },
// );

export const deleteCattleTrade = createAsyncThunk(
  'cattle/deleteCattleTrade',
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
const cattleSlice = createSlice({
  name: 'cattle',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCattlesList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCattlesList.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCattlesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const {resetError} = cattleSlice.actions;
export default cattleSlice.reducer;
