import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appBarVisible: true,
};

const appBarSlice = createSlice({
  name: 'appBar',
  initialState,
  reducers: {
    setAppBar: (state, action) => {
      console.log(action.payload);

      state.appBarVisible = action.payload;
    },
  },
});

export const {setAppBar} = appBarSlice.actions;
export default appBarSlice.reducer;
