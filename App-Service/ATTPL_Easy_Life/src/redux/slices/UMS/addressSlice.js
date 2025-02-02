import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  addresses: [],
  status: 'idle',
  error: null,
};

// Async thunk for adding user addresses
export const addUserAddress = createAsyncThunk(
  'userAddresses/addUserAddress',
  async (addressData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/create/user-addresses',
        addressData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Async thunk for updating user addresses
export const updateUserAddress = createAsyncThunk(
  'userAddresses/updateUserAddress',
  async ({userId, userAddressId, addressData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `/api/v1/user/update/user-addresses/${userId}/${userAddressId}`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const userAddressesSlice = createSlice({
  name: 'userAddresses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addUserAddress.pending, state => {
        state.status = 'loading';
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses.push(action.payload.data);
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(updateUserAddress.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.addresses.findIndex(
          address =>
            address.userAddressId === action.payload.data.userAddressId,
        );
        if (index !== -1) {
          state.addresses[index] = action.payload.data;
        }
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default userAddressesSlice.reducer;
