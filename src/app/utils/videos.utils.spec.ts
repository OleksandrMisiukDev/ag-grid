import { mockInitialState, mockItems } from '../shared/mock-data.constants';
import { VideoGridRowItem } from '../shared/video-grid-row-item.interface';
import { mapItemsToVideos } from './videos.utils';

/* eslint-disable */
describe('Videos utils', () => {
  let items = mockItems;
  describe('mapItemsToVideos', () => {
    it('should return array of VideoGridRowItems', () => {
      const result = mockInitialState.appStore.videos as VideoGridRowItem[];
      expect(mapItemsToVideos(items)).toEqual(result);
    });
  });
});
