import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  mappings: [],
  loading: false,
  error: null,
};

// Thunks for product role operations
export const fetchMappings = createAsyncThunk(
  'productRole/fetchMappings',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('/api/v1/user/product-role/fetchAll', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust token retrieval as needed
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateProductRole = createAsyncThunk(
  'productRole/updateProductRole',
  async (productRoleData, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        '/api/v1/user/mapping/update/product-role',
        productRoleData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
const productRoleSlice = createSlice({
  name: 'productRole',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMappings.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMappings.fulfilled, (state, action) => {
        state.loading = false;
        state.mappings = action.payload;
      })
      .addCase(fetchMappings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductRole.pending, state => {
        state.loading = true;
      })
      .addCase(updateProductRole.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update the state if necessary
      })
      .addCase(updateProductRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productRoleSlice.reducer;
