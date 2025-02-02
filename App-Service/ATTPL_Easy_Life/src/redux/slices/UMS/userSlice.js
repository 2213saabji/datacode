import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  users: [],
  userProfile: null,
  loading: false,
  error: null,
};

// Thunks for API calls
export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async ({page = 1, limit = 10}, {rejectWithValue}) => {
    try {
      const response = await axios.get('/api/v1/user/fetchAll', {
        params: {page, limit},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserProfileByToken = createAsyncThunk(
  'user/fetchUserProfileByToken',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('/api/v1/user/profile/fetch');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserProfileById = createAsyncThunk(
  'user/fetchUserProfileById',
  async (userId, {rejectWithValue}) => {
 console.log("call",userId.userId)
    try {

      const response = await axios.get(`/api/v1/user/profile/fetch/${userId.userId}`);
      
      return response.data;


    } catch (error) {
      console.log("response",response.data)
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({userId, data}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`/api/v1/user/update/${userId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`/api/v1/user/delete/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const searchUser = createAsyncThunk(
  'user/searchUser',
  async ({name, page = 1, limit = 10}, {rejectWithValue}) => {
    try {
      const response = await axios.get('/api/v1/user/search', {
        params: {name, page, limit},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUsersCreatedBy = createAsyncThunk(
  'user/fetchUsersCreatedBy',
  async (createdBy, {rejectWithValue}) => {
    try {
      const response = await axios.get(`/api/v1/user/fetchAll/${createdBy}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Create slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfileByToken.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.data || null;
      })
      .addCase(fetchUserProfileByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfileById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.data || null;
      })
      .addCase(fetchUserProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle user update if needed
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Handle user deletion if needed
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsersCreatedBy.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersCreatedBy.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
      })
      .addCase(fetchUsersCreatedBy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
