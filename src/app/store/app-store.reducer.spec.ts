import * as fromAppStoreReducer from './app-store.reducer';
import { VideoGridRowItem } from '../shared/video-grid-row-item.interface';
import { mockInitialState } from '../shared/mock-data.constants';
import { putVideosToStore } from './app-store.actions';

/* eslint-disable */
describe('AppStoreReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromAppStoreReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromAppStoreReducer.appStoreReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('putVideosToStore action', () => {
    it('should put all videos and update the state in an immutable way', () => {
      const { initialState } = fromAppStoreReducer;
      const newState: VideoGridRowItem[] = mockInitialState.appStore.videos;
      const action = putVideosToStore({ videos: newState });
      const state = fromAppStoreReducer.appStoreReducer(initialState, action);

      expect(state).toEqual(mockInitialState.appStore);
      expect(state).not.toBe(mockInitialState.appStore);
    });
  });
});
