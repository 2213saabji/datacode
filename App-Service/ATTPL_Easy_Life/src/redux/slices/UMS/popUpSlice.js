import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  popUpFormDetails: null,
  updateStatus: null,
  loading: false,
  error: null,
};

// Thunks
export const addPopUpFormDetails = createAsyncThunk(
  'popUp/addPopUpFormDetails',
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post('/api/v1/user/pop-up/form', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust token retrieval as needed
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updatePopUpDetails = createAsyncThunk(
  'popUp/updatePopUpDetails',
  async ({userId, updateData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `/api/v1/user/update/pop-up/${userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust token retrieval as needed
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Slice
const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addPopUpFormDetails.pending, state => {
        state.loading = true;
      })
      .addCase(addPopUpFormDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.popUpFormDetails = action.payload;
      })
      .addCase(addPopUpFormDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePopUpDetails.pending, state => {
        state.loading = true;
      })
      .addCase(updatePopUpDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.updateStatus = action.payload;
      })
      .addCase(updatePopUpDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default popUpSlice.reducer;
