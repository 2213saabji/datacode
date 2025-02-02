import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  data: {},
  status: 'idle',
  error: null,
};

// Async thunk for adding user addresses
export const addDelivery = createAsyncThunk(
  'delivery/addDelivery',
  async ({data}, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/create/user-addresses',
        data,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);


const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addDelivery.pending, state => {
        state.status = 'loading';
      })
      .addCase(addDelivery.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addDelivery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
    
  },
});

export default deliverySlice.reducer;
