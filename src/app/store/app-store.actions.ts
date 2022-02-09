import { createAction, props } from '@ngrx/store';
import { VideoGridRowItem } from '../shared/video-grid-row-item.interface';

export const putVideosToStore = createAction(
  '[App Store] Put Videos To Store',
  props<{ videos: VideoGridRowItem[] }>(),
);
