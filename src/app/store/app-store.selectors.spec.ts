import { mockInitialState } from '../shared/mock-data.constants';

import { selectAppStore, selectVideos } from './app-store.selectors';

/* eslint-disable */
describe('Selectors', () => {
  it('should select the appStore', () => {
    const result = selectAppStore(mockInitialState);
    expect(result).toEqual(mockInitialState.appStore);
  });
  it('should select the videos list', () => {
    const result = selectVideos.projector(mockInitialState.appStore, mockInitialState.appStore.videos);
    expect(result.length).toEqual(3);
    expect(result[1].id).toEqual(mockInitialState.appStore.videos[1].id);
  });
});
