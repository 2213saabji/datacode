import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  profileImage: null,
  loading: false,
  error: null,
};

// Thunks
export const uploadProfileImage = createAsyncThunk(
  'profileImage/uploadProfileImage',
  async (profileImageData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/create/user-profile-image',
        profileImageData,
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

export const updateProfileImage = createAsyncThunk(
  'profileImage/updateProfileImage',
  async ({userId, profileImageData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `/api/v1/user/update/user-profile-image/${userId}`,
        profileImageData,
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

export const deleteProfileImage = createAsyncThunk(
  'profileImage/deleteProfileImage',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `/api/v1/user/delete/user-profile-image/${userId}`,
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

export const fetchProfileImage = createAsyncThunk(
  'profileImage/fetchProfileImage',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `/api/v1/user/user-profile-image/fetch/${userId}`,
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
const profileImageSlice = createSlice({
  name: 'profileImage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadProfileImage.pending, state => {
        state.loading = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload.data;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileImage.pending, state => {
        state.loading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload.data;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProfileImage.pending, state => {
        state.loading = true;
      })
      .addCase(deleteProfileImage.fulfilled, state => {
        state.loading = false;
        state.profileImage = null;
      })
      .addCase(deleteProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfileImage.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload.data;
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileImageSlice.reducer;
