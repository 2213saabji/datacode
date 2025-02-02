// src/slices/institutionAppointmentSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../../services/ApiCaller';

// Initial state
const initialState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations

export const fetchAppointmentStudentView = createAsyncThunk(
  'institution/fetchAppointmentStudentView',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          '/instituteAppointmentBooking/fetchByStudent',
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

export const fetchAppointmentInstitutionView = createAsyncThunk(
  'institution/fetchAppointmentInstitutionView',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          '/instituteAppointmentBooking/fetchByInstitution',
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

export const fetchAppointment = createAsyncThunk(
  'institution/fetchAppointment',
  async (institutionAppointmentId, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/instituteAppointmentBooking/fetch/${institutionAppointmentId}`,
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

export const deleteInstitutionAppointment = createAsyncThunk(
  'institution/deleteInstitutionAppointment',
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

export const createInstitutionAppointment = createAsyncThunk(
  'institution/createInstitutionAppointment',
  async (formData, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();

      const accessToken = auth.token;
      const response = await ApiCaller.post(
        '/instituteAppointmentBooking/create',
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

export const fetchStudentCourseCategory = createAsyncThunk(
  'institution/fetchStudentCourseCategory',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get('/jobs/jobtype/fetchAll', 'bms', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });

        const res = await response;

        return res?.data?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const fetchStudentSubCourseCategory = createAsyncThunk(
  'institution/fetchStudentSubCourseCategory',
  async (selectedCourse, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/jobs/fetch/job/${selectedCourse}`,
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

export const fetchStudentCourseInfo = createAsyncThunk(
  'institution/fetchStudentCourseInfo',
  async (selectedSubCourse, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/jobs/job-details/${selectedSubCourse}`,
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

export const fetchCollegeByState = createAsyncThunk(
  'institution/fetchCollegeByState',
  async (data, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      console.log('state data++++++++++++>', data);

      if (accessToken) {
        const response = await ApiCaller.get(
          `/jobs/fetch/${data.selectedState}/course/${data.subCourseId}`,
          'bms',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );

        const res = await response;

        return res?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

// Job Slice
const institutionAppointmentSlice = createSlice({
  name: 'institution',
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

export const {resetError} = institutionAppointmentSlice.actions;
export default institutionAppointmentSlice.reducer;
