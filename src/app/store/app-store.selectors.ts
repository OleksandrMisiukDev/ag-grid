import { createSelector } from '@ngrx/store';

import { AppStore } from './app-store.interfaces';

export const selectAppStore = (store: any) => store.appStore;

export const selectVideos = createSelector(selectAppStore, (state: AppStore) => state.videos);
