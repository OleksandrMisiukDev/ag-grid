import { createReducer, on } from '@ngrx/store';

import { AppStore } from './app-store.interfaces';
import { putVideosToStore } from './app-store.actions';

export const initialState: AppStore = {
  videos: [],
};

export const appStoreReducer = createReducer(
  initialState,
  on(putVideosToStore, (state, action): AppStore => ({ ...state, videos: action.videos })),
);
