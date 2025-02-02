import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  images: [],
  uploading: false,
  deleting: false,
  error: null,
};

// Thunks
export const uploadImage = createAsyncThunk(
  'image/uploadImage',
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post('/api/v1/user/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const uploadImages = createAsyncThunk(
  'image/uploadImages',
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/upload-images',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteImage = createAsyncThunk(
  'image/deleteImage',
  async (url, {rejectWithValue}) => {
    try {
      const response = await axios.post('/api/v1/user/delete-image', {url});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteImages = createAsyncThunk(
  'image/deleteImages',
  async (urls, {rejectWithValue}) => {
    try {
      const response = await axios.post('/api/v1/user/delete-images', {urls});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// Slice
const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadImage.pending, state => {
        state.uploading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploading = false;
        state.images.push(action.payload.data);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })
      .addCase(uploadImages.pending, state => {
        state.uploading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploading = false;
        state.images = [...state.images, ...action.payload.data];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })
      .addCase(deleteImage.pending, state => {
        state.deleting = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.deleting = false;
        state.images = state.images.filter(
          image => image.key !== action.payload.data.key,
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })
      .addCase(deleteImages.pending, state => {
        state.deleting = true;
      })
      .addCase(deleteImages.fulfilled, (state, action) => {
        state.deleting = false;
        const deletedKeys = action.payload.data;
        state.images = state.images.filter(
          image => !deletedKeys.includes(image.key),
        );
      })
      .addCase(deleteImages.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export default imageSlice.reducer;
