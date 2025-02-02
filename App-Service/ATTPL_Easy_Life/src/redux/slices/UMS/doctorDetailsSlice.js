// doctorDetailsSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://example.com/api/v1/user';

// Async thunks for API calls
export const fetchDoctorDetails = createAsyncThunk(
  'doctorDetails/fetchDoctorDetails',
  async (doctorId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetch/doctor-details/${doctorId}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateDoctorDetails = createAsyncThunk(
  'doctorDetails/updateDoctorDetails',
  async ({doctorDetailsId, updateData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/update/doctor-details/${doctorDetailsId}`,
        updateData,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createDoctorDetails = createAsyncThunk(
  'doctorDetails/createDoctorDetails',
  async (doctorData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/create/doctor-details`,
        doctorData,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAllDoctors = createAsyncThunk(
  'doctorDetails/fetchAllDoctors',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetch-All/doctor-details`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteDoctorDetails = createAsyncThunk(
  'doctorDetails/deleteDoctorDetails',
  async (doctorDetailsId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/delete/doctor-details/${doctorDetailsId}`,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const doctorDetailsSlice = createSlice({
  name: 'doctorDetails',
  initialState: {
    data: [],
    selectedDoctor: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch Doctor Details
      .addCase(fetchDoctorDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDoctorDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedDoctor = action.payload;
      })
      .addCase(fetchDoctorDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Doctor Details
      .addCase(updateDoctorDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateDoctorDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedDoctor = action.payload;
        state.data = state.data.map(doctor =>
          doctor.id === updatedDoctor.id ? updatedDoctor : doctor,
        );
      })
      .addCase(updateDoctorDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create Doctor Details
      .addCase(createDoctorDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(createDoctorDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(createDoctorDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch All Doctors
      .addCase(fetchAllDoctors.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete Doctor Details
      .addCase(deleteDoctorDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteDoctorDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(
          doctor => doctor.id !== action.payload.id,
        );
      })
      .addCase(deleteDoctorDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default doctorDetailsSlice.reducer;
