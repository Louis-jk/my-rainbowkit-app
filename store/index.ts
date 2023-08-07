import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import reducer from './modules';

const store = wrapMakeStore(() =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ['my.subtree'],
        })
      ),
  })
);

export const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV !== 'production',
});
