import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Thunks for product operations
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        '/api/v1/user/create/product-detail',
        productData,
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

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, {rejectWithValue}) => {
    try {
      await axios.delete(`/api/v1/user/delete/product-detail/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return productId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        '/api/v1/user/product-details/fetchAll',
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

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `/api/v1/user/fetch/product-detail/${productId}`,
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

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({productId, productData}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `/api/v1/user/update/product-detail/${productId}`,
        productData,
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
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addProduct.pending, state => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, state => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          product => product.id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, state => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map(product =>
          product.id === action.payload.id ? action.payload : product,
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
