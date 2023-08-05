import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMember: false,
  possibleQuantity: 0,
};

const AllowListSlice = createSlice({
  name: 'allowListInfo',
  initialState,
  reducers: {
    updateAllowListStatus: (state, action) => {
      state.isMember = action.payload;
    },
    updateAllowListMemberQuantity: (state, action) => {
      state.possibleQuantity = action.payload;
    },
  },
});

export const { updateAllowListStatus, updateAllowListMemberQuantity } =
  AllowListSlice.actions;
export default AllowListSlice.reducer;
