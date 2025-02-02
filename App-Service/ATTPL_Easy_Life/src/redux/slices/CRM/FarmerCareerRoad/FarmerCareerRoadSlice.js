// src/slices/farmerCareerSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations

export const fetchCards = createAsyncThunk(
  'farmerCareer/fetchCards',
  async (subRoute, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/routes/fetch/${subRoute}/${auth?.user?.UserAddressesses?.[0].userState}`,
          'bms',
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

export const createFarmerAppointment = createAsyncThunk(
  'farmerCareer/createFarmerAppointment',
  async (formData, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();

      const accessToken = auth.token;
      const response = await ApiCaller.post(
        '/agricultureAppointment/create',
        formData,
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

export const fetchAppointment = createAsyncThunk(
  'institution/fetchAppointment',
  async (agricultureAppointmentId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/agricultureAppointment/fetch/${agricultureAppointmentId}`,
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

export const fetchAgriAppointmentFarmerView = createAsyncThunk(
  'farmerCareer/fetchAgriAppointmentFarmerView',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          '/agricultureAppointment/fetchByFarmer',
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

export const fetchAgriAppointmentSellerView = createAsyncThunk(
  'farmerCareer/fetchAgriAppointmentSellerView',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          '/agricultureAppointment/fetchBySeller',
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

export const deleteFarmerAppointment = createAsyncThunk(
  'jobs/deleteFarmerAppointment',
  async (appointmentId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.delete(
          `/agricultureAppointment/delete/${appointmentId}`,
          'cms',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );
        const res = await response;
        console.log('delete==>', res);

        return res?.data?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const fetchFarmerSeasonType = createAsyncThunk(
  'farmerCareer/fetchFarmerSeasonType',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          '/farmer/fetch/season-types',
          'bms',
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

export const fetchFarmerSoilType = createAsyncThunk(
  'farmerCareer/fetchFarmerSoilType',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          '/farmer/fetch/soil-types',
          'bms',
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

export const fetchFarmerCropType = createAsyncThunk(
  'farmerCareer/fetchFarmerCropType',
  async (data, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/farmer/fetch/croptypesbysoilseason/${data.selectedSoil}/${data.selectedSeason}`,
          'bms',
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

export const fetchFarmerConditionInfo = createAsyncThunk(
  'farmerCareer/fetchFarmerConditionInfo',
  async (data, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/farmer/fetchfarmerConditions/${data.selectedCrop}/${data.selectedSeason}/${data.selectedSoil}`,
          'bms',
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

// Job Slice
const farmerCareerSlice = createSlice({
  name: 'farmerCareer',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCards.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {resetError} = farmerCareerSlice.actions;
export default farmerCareerSlice.reducer;
