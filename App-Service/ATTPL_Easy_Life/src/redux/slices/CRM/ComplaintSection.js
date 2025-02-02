import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiCaller from '../../../services/ApiCaller';

const initialState = {
  loading: false,
  error: null,
  message: null,
};

export const fetchComplaints = createAsyncThunk(
  'complaint/fetchComplaints',
  async (_, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;
      if (accessToken) {
        const response = await ApiCaller.get(
          'complaints/complaintSectionRoutes/fetchAll',
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

export const fetchSubComplaints = createAsyncThunk(
  'complaint/fetchSubComplaints',
  async (subRoute, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/complaints/complainsection/${subRoute}`,
          'bms',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );

        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

export const fetchSubStateComplaints = createAsyncThunk(
  'complaint/fetchSubStateComplaints',
  async (subRoute, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const accessToken = auth.token;

      if (accessToken) {
        const response = await ApiCaller.get(
          `/complaints/complainsection/${subRoute}/${auth?.user?.UserAddressesses?.[0].userState}`,
          'bms',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
          },
        );

        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  },
);

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComplaints.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {resetError} = complaintSlice.actions;
export default complaintSlice.reducer;
