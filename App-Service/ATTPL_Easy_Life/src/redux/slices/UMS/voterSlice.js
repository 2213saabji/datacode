import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  voter: null,
  loading: false,
  error: null,
};

// Thunk for adding a voter
export const addVoter = createAsyncThunk(
  'voter/addVoter',
  async (voterData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/add-voter/form',
        voterData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust token retrieval as needed
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
const voterSlice = createSlice({
  name: 'voter',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addVoter.pending, state => {
        state.loading = true;
      })
      .addCase(addVoter.fulfilled, (state, action) => {
        state.loading = false;
        state.voter = action.payload.data;
      })
      .addCase(addVoter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default voterSlice.reducer;
