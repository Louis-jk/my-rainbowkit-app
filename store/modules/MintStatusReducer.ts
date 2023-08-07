import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  modalVisible: false,
};

const mintStatusSlice = createSlice({
  name: 'mintStatusInfo',
  initialState,
  reducers: {
    updateMintLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
      state.isSuccess = false;
      state.isError = false;
      state.modalVisible = true;
    },
    updateMintSuccessStatus: (state, action) => {
      state.isLoading = false;
      state.isSuccess = action.payload;
      state.isError = false;
      state.modalVisible = true;
    },
    updateMintErrorStatus: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.payload;
      state.modalVisible = true;
    },
    updateMintModalVisible: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.modalVisible = action.payload;
    },
  },
});

export const {
  updateMintLoadingStatus,
  updateMintSuccessStatus,
  updateMintErrorStatus,
  updateMintModalVisible,
} = mintStatusSlice.actions;
export default mintStatusSlice.reducer;
