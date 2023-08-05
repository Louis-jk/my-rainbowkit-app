import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const mintStatusSlice = createSlice({
  name: 'mintStatusInfo',
  initialState,
  reducers: {
    updateMintStatus: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateMintStatus } = mintStatusSlice.actions;
export default mintStatusSlice.reducer;
