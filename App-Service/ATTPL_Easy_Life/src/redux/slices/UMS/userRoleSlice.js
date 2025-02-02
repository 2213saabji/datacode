// src/redux/slices/UMS/userRoleSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  userRoles: [],
  currentUserRole: null,
  loading: false,
  error: null,
  message: null,
};

// Thunks for async operations
export const createUserRole = createAsyncThunk(
  'userRole/createUserRole',
  async (roleData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/create/user-role',
        roleData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deleteUserRole = createAsyncThunk(
  'userRole/deleteUserRole',
  async (userRoleId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `/api/v1/user/delete/user-role/${userRoleId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateUserRole = createAsyncThunk(
  'userRole/updateUserRole',
  async ({userRoleId, roleData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `/api/v1/user/update/user-role/${userRoleId}`,
        roleData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchUserRole = createAsyncThunk(
  'userRole/fetchUserRole',
  async (userRoleId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `/api/v1/user/user-role/fetch/${userRoleId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchAllUserRoles = createAsyncThunk(
  'userRole/fetchAllUserRoles',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('/api/v1/user/user-role/fetchAll');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchProductBasedRoles = createAsyncThunk(
  'userRole/fetchProductBasedRoles',
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `/api/v1/user/user-role/fetchAll/product-based/${productId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// User Role Slice
const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUserRole.pending, state => {
        state.loading = true;
      })
      .addCase(createUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserRole.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, state => {
        state.loading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserRole.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUserRole = action.payload.data;
      })
      .addCase(fetchUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUserRoles.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllUserRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.userRoles = action.payload.data;
      })
      .addCase(fetchAllUserRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductBasedRoles.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductBasedRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.userRoles = action.payload.data;
      })
      .addCase(fetchProductBasedRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userRoleSlice.reducer;
