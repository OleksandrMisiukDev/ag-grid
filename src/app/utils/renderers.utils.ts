import { ICellRendererParams } from 'ag-grid-community';
import { VideoGridRowItem } from '../shared/video-grid-row-item.interface';
import { YOUTUBE_VIDEO_BASE_URL } from '../shared/base-urls.constants';

export function thumbnailRenderer(params: ICellRendererParams) {
  const videoGridRowItem = params.data as VideoGridRowItem;
  const { thumbnail, title } = videoGridRowItem;
  return '<img alt="' + title + '" src="' + thumbnail + '">';
}

export function titleRenderer(params: ICellRendererParams) {
  const videoGridRowItem = params.data as VideoGridRowItem;
  const { id, title } = videoGridRowItem;
  return '<a href="' + YOUTUBE_VIDEO_BASE_URL + id + '">' + title + '</a>';
}
