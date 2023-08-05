import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import MintStatusReducer from './MintStatusReducer';
import AllowListReducer from './AllowListReducer';

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }

  return combineReducers({
    mintStatus: MintStatusReducer,
    allowList: AllowListReducer,
  })(state, action);
};

export default reducer;
