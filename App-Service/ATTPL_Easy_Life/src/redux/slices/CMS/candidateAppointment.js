
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiCaller from '../../../services/ApiCaller';

// Initial state
const initialState = {
  appointments: [],
  appointmentDetails: null,
  candidates: [], 
  loading: false,
  error: null,
  message: null,
};
// const initialState = {
//   appointments: [],
//   appointmentDetails: null,
//   loading: false,
//   error: null,
//   message: null,
// };

// Thunks for async operations

export const getCandidateAppointment = createAsyncThunk(
  'appointments/getCandidateAppointment',
  async (AppointmentId, { getState, rejectWithValue }) => {
    try {
      
      const { auth } = getState();
      const accessToken = auth.token;
      if (accessToken) {
        const response = await ApiCaller.get(`/appointment/fetch/${AppointmentId}`, 'ems', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const getCandidateAppointments = createAsyncThunk(
  'appointments/getCandidateAppointments',
  async (_, { getState, rejectWithValue }) => {
    try {

      const { auth } = getState();
      const accessToken = auth.token;
      console.log("accessToken-->",accessToken)
      if (accessToken) {
     
        const response = await ApiCaller.get('/appointment/fetchAll', 'ems', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log( "response===>",response.data )
        return response.data.data;
      }
    } catch (error) {
      
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
export const fetchallCandidate = createAsyncThunk(
  'appointments/getCandidateAppointments',
  async (_, { getState, rejectWithValue }) => {
    try {
      // console.log("dataaaa")
      const { auth } = getState();
      const accessToken = auth.token;
     
      if (accessToken) {
        console.log("data here--->",accessToken)
     
        const response = await ApiCaller.get('/appointment/fetchByCandidate', 'ems', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log( response )
        return response.data.data;
      }
    } catch (error) {
      
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
// appointment/fetchAll
export const createCandidateAppointment = createAsyncThunk(
  'appointments/createCandidateAppointment',
  async (formData, { getState, rejectWithValue }) => {
    
    try {
      const { auth } = getState();
      const accessToken = auth.token;
      console.log("formdata==>",formData)
      const response = await ApiCaller.post(
        '/appointment/create',
      
        formData,
        'ems',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const updateCandidateAppointment = createAsyncThunk(
  'appointment/updateCandidateAppointment',
  async ({ formData ,appointmentId}, { getState, rejectWithValue }) => {
    console.log(formData,"++++",appointmentId)
    try {
      const { auth } = getState();
      const accessToken = auth.token;
      const response = await ApiCaller.put(
        `/appointment/update/${appointmentId}`,
        formData,
        'ems',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("updated===\\>",response)
      return response.data;
      
    } catch (error) {
      console.log("erro in update===>")
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Slice
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
    resetAppointments: state => {
      state.appointments = [];
      state.appointmentDetails = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCandidateAppointment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCandidateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentDetails = action.payload;
      })
      .addCase(getCandidateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchallCandidate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchallCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.allDoctors = action.payload;
      })
      .addCase(fetchallCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // .addCase(fetchalldoctor.pending, state => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchalldoctor.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.appointments = action.payload;
      // })
      // .addCase(fetchalldoctor.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })


      .addCase(getCandidateAppointments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCandidateAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getCandidateAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCandidateAppointment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCandidateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(createCandidateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCandidateAppointment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCandidateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(app => app.id === action.payload.appointmentid);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(updateCandidateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;

// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import ApiCaller from '../../../services/ApiCaller';

// // Initial state
// const initialState = {
//   appointments: [],
//   loading: false,
//   error: null,
//   message: null,
// };

// // Thunks for async operations


// export const GetDoctorAppointment = createAsyncThunk(
//   '/doctor/fetchAppointment',
//   async (appointmentId, {getState, rejectWithValue}) => {
//     try {
//       const {auth} = getState();
//       const accessToken = auth.token;
//       if (accessToken) {
//         const response = await ApiCaller.get(`/doctor/fetchAppointment/${appointmentId}`, 'cms', {
//           headers: {Authorization: `Bearer ${accessToken}`},
//         });
//         const res = await response;
//         return res?.data?.data;
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data.message || error.message);
//     }
//   },
// );


// export const GetdoctorAppointments = createAsyncThunk(
//   '/doctor/fetchAppointments',
//   async (_, {getState, rejectWithValue}) => {
//     try {
//       const {auth} = getState();
//       const accessToken = auth.token;
//       if (accessToken) {
//         const response = await ApiCaller.get('/doctor/fetchAppointments', 'tms', {
//           headers: {Authorization: `Bearer ${accessToken}`},
//         });
//         const res = await response;
//         return res?.data?.data;
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data.message || error.message);
//     }
//   },
// );



// export const createDoctorAppointment = createAsyncThunk(
//   '/doctor/createAppointment',
//   async (formData, {getState,rejectWithValue}) => {
//     try {
//       const {auth} = getState();
//       const accessToken = auth.token;
//       const response = await ApiCaller.post(
//         '/doctor/createAppointment',
//         formData,
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

// export const updateDoctorAppointment = createAsyncThunk(
//   '/doctor/updateAppointment',
//   async ({appointmentId, formData}, {rejectWithValue}) => {
//     try {
//       const response = await ApiCaller.put(
//         `/doctor/updateAppointment/${appointmentId}`,
//         formData,
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

// // Job Slice
// const jobSlice = createSlice({
//   name: 'jobs',
//   initialState,
//   reducers: {
//     resetError: state => {
//       state.error = null;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchLabourJobs.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLabourJobs.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload;
//       })
//       .addCase(fetchLabourJobs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchLabourJobType.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchLabourJobType.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs = action.payload;
//       })
//       .addCase(fetchLabourJobType.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(createLabourJob.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createLabourJob.fulfilled, (state, action) => {
//         state.loading = false;
//         state.jobs.push(action.payload);
//       })
//       .addCase(createLabourJob.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateJob.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateJob.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.jobs.findIndex(job => job.id === action.payload.id);
//         if (index !== -1) {
//           state.jobs[index] = action.payload;
//         }
//       })
//       .addCase(updateJob.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {resetError} = jobSlice.actions;
// export default jobSlice.reducer;

// // docterappoinment: {
// //   create: '/doctor/createAppointment',
// //   list: '/doctor/fetchAppointments',
// //   details: '/doctor/fetchAppointment', 
// //   delete: '/doctor/deleteAppointment',
// //   update: '/doctor/updateAppointment',
// // fetchalldoctor:'/doctor/fetchAllFromUMS',
// // fetchalldoctordetails:'doctor/fetchAll'