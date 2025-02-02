import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiCaller from '../../../services/ApiCaller';

// Thunk for uploading user file to AWS S3
export const uploadUserFileInAWSS3 = createAsyncThunk(
  'imageUpload/uploadUserFileInAWSS3',
  async (data, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const accessToken = auth.token;

      const response = await ApiCaller.post(
        '/user/upload-image',
        data,
        'ums',
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response; // Assuming the response contains the data you need
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUserFileFromAWSS3 = createAsyncThunk(
  'imageUpload/deleteUserFileFromAWSS3',
  async (data, { getState, rejectWithValue }) => {
  try {
    
    const {auth} = getState();
    const accessToken = auth.token;
    const response = await ApiCaller.post(
      '/user/delete-image',
      data,
       'ums',
       {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },

      );
      console.log("deleted", response);
      
    return response; 
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
}
);

// Slice to handle the state related to file upload
const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState: {
    fileUploadStatus: 'idle',
    fileUploadError: null,
    fileDeleteStatus: 'idle',
    fileDeleteError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserFileInAWSS3.pending, (state) => {
        state.fileUploadStatus = 'loading';
        state.fileUploadError = null;
      })
      .addCase(uploadUserFileInAWSS3.fulfilled, (state, action) => {
        state.fileUploadStatus = 'succeeded';
        // We can add additional logic to handle the response data if needed
      })
      .addCase(uploadUserFileInAWSS3.rejected, (state, action) => {
        state.fileUploadStatus = 'failed';
        state.fileUploadError = action.payload || 'Failed to upload file';
      })
      .addCase(deleteUserFileFromAWSS3.pending, (state) => {
        state.fileDeleteStatus = 'loading';
        state.fileDeleteError = null;
      })
      .addCase(deleteUserFileFromAWSS3.fulfilled, (state, action) => {
        state.fileDeleteStatus = 'succeeded';
        // We can add additional logic to handle the response data if needed
      })
      .addCase(deleteUserFileFromAWSS3.rejected, (state, action) => {
        state.fileDeleteStatus = 'failed';
        state.fileDeleteError = action.payload || 'Failed to delete file';
      });
  },
});

// Export the reducer to be used in the store
export default imageUploadSlice.reducer;