// src/redux/slices/UMS/userProfileSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  userProfiles: [],
  currentUserProfile: null,
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations
export const createUserProfile = createAsyncThunk(
  'userProfile/createUserProfile',
  async (profileData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/create/user-profile-details',
        profileData,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async ({userId, profileData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `/api/v1/user/update/user-profile-details/${userId}`,
        profileData,
        {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteUserProfile = createAsyncThunk(
  'userProfile/deleteUserProfile',
  async (userProfileId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `/api/v1/user/delete/user-profile-details/${userProfileId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (userProfileId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `/api/v1/user/user-profile-details/fetch/${userProfileId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchAllUserProfiles = createAsyncThunk(
  'userProfile/fetchAllUserProfiles',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        '/api/v1/user/user-profile-details/fetchAll',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// User Profile Slice
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.currentUserProfile = action.payload.data;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUserProfile = action.payload.data;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUserProfiles.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllUserProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfiles = action.payload.data;
      })
      .addCase(fetchAllUserProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
