import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  userIdentity: null,
  status: 'idle',
  error: null,
};

// Async thunk for updating user identity details
export const updateUserIdentity = createAsyncThunk(
  'userIdentity/updateUserIdentity',
  async ({userId, userIdentityId, identityData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `/api/v1/user/update/user-identity-details/${userId}/${userIdentityId}`,
        identityData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust for your auth method
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

// Async thunk for adding user identity details
export const addUserIdentity = createAsyncThunk(
  'userIdentity/addUserIdentity',
  async (identityData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/create/user-identity-details',
        identityData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust for your auth method
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

const userIdentitySlice = createSlice({
  name: 'userIdentity',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateUserIdentity.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUserIdentity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userIdentity = action.payload.data;
      })
      .addCase(updateUserIdentity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(addUserIdentity.pending, state => {
        state.status = 'loading';
      })
      .addCase(addUserIdentity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userIdentity = action.payload.data;
      })
      .addCase(addUserIdentity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default userIdentitySlice.reducer;
