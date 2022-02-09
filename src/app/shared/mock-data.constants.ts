import { Item, VideosHttpResponse } from '../services/videos.interfaces';
import { thumbnailRenderer, titleRenderer } from '../utils/renderers.utils';
import { VideoGridRowItem } from './video-grid-row-item.interface';

export const mockVideosHttpResponse: VideosHttpResponse = {
  etag: 'etag',
  items: [
    {
      etag: 'etag',
      id: 'id',
      kind: 'youtube#video',
      snippet: {
        categoryId: '1',
        channelId: 'channelId',
        channelTitle: 'channelTitle',
        description: 'description',
        liveBroadcastContent: 'none',
        localized: { description: 'description', title: 'title' },
        publishedAt: '2022-02-02T14:35:09Z',
        tags: ['espn', 'youtube'],
        thumbnails: {
          default: { height: 90, url: 'img', width: 120 },
          high: { height: 90, url: 'img', width: 120 },
          medium: { height: 90, url: 'img', width: 120 },
        },
        title: 'title',
      },
    },
    {
      etag: 'etag',
      id: 'id',
      kind: 'youtube#video',
      snippet: {
        categoryId: '1',
        channelId: 'channelId',
        channelTitle: 'channelTitle',
        description: 'description',
        liveBroadcastContent: 'none',
        localized: { description: 'description', title: 'title' },
        publishedAt: '2022-02-02T14:35:09Z',
        tags: ['espn', 'youtube'],
        thumbnails: {
          default: { height: 90, url: 'img', width: 120 },
          high: { height: 90, url: 'img', width: 120 },
          medium: { height: 90, url: 'img', width: 120 },
        },
        title: 'title',
      },
    },
    {
      etag: 'etag',
      id: 'id',
      kind: 'youtube#video',
      snippet: {
        categoryId: '1',
        channelId: 'channelId',
        channelTitle: 'channelTitle',
        description: 'description',
        liveBroadcastContent: 'none',
        localized: { description: 'description', title: 'title' },
        publishedAt: '2022-02-02T14:35:09Z',
        tags: ['espn', 'youtube'],
        thumbnails: {
          default: { height: 90, url: 'img', width: 120 },
          high: { height: 90, url: 'img', width: 120 },
          medium: { height: 90, url: 'img', width: 120 },
        },
        title: 'title',
      },
    },
  ],
  kind: 'youtube#videoListResponse',
  nextPageToken: 'nextPageToken',
  pageInfo: { totalResults: 10, resultsPerPage: 5 },
};

export const mockItems: Item[] = [
  {
    etag: 'etag',
    id: 'id',
    kind: 'youtube#video',
    snippet: {
      categoryId: '1',
      channelId: 'channelId',
      channelTitle: 'channelTitle',
      description: 'description',
      liveBroadcastContent: 'none',
      localized: { description: 'description', title: 'title' },
      publishedAt: '2022-02-02T14:35:09Z',
      tags: ['espn', 'youtube'],
      thumbnails: {
        default: { height: 90, url: 'img', width: 120 },
        high: { height: 90, url: 'img', width: 120 },
        medium: { height: 90, url: 'img', width: 120 },
      },
      title: 'title',
    },
  },
  {
    etag: 'etag',
    id: 'id',
    kind: 'youtube#video',
    snippet: {
      categoryId: '1',
      channelId: 'channelId',
      channelTitle: 'channelTitle',
      description: 'description',
      liveBroadcastContent: 'none',
      localized: { description: 'description', title: 'title' },
      publishedAt: '2022-02-02T14:35:09Z',
      tags: ['espn', 'youtube'],
      thumbnails: {
        default: { height: 90, url: 'img', width: 120 },
        high: { height: 90, url: 'img', width: 120 },
        medium: { height: 90, url: 'img', width: 120 },
      },
      title: 'title',
    },
  },
  {
    etag: 'etag',
    id: 'id',
    kind: 'youtube#video',
    snippet: {
      categoryId: '1',
      channelId: 'channelId',
      channelTitle: 'channelTitle',
      description: 'description',
      liveBroadcastContent: 'none',
      localized: { description: 'description', title: 'title' },
      publishedAt: '2022-02-02T14:35:09Z',
      tags: ['espn', 'youtube'],
      thumbnails: {
        default: { height: 90, url: 'img', width: 120 },
        high: { height: 90, url: 'img', width: 120 },
        medium: { height: 90, url: 'img', width: 120 },
      },
      title: 'title',
    },
  },
];

export const mockInitialState = {
  appStore: {
    videos: [
      {
        id: 'id',
        description: 'description',
        title: 'title',
        publishedAt: 'Wed Feb 02 2022',
        thumbnail: 'img',
      },
      {
        id: 'id',
        description: 'description',
        title: 'title',
        publishedAt: 'Wed Feb 02 2022',
        thumbnail: 'img',
      },
      {
        id: 'id',
        description: 'description',
        title: 'title',
        publishedAt: 'Wed Feb 02 2022',
        thumbnail: 'img',
      },
    ],
  },
};

export const mockVideoGridRowItem: VideoGridRowItem = {
  id: 'id',
  description: 'description',
  title: 'title',
  publishedAt: 'Wed Feb 02 2022',
  thumbnail: 'img',
};

export const mockColumnDefs = [
  {
    checkboxSelection: true,
    colId: 'CHECKBOX_SELECTION',
    flex: 0,
    headerCheckboxSelection: true,
    headerName: ' ',
    minWidth: 50,
    width: 0,
  },
  {
    cellRenderer: thumbnailRenderer,
    field: 'thumbnail',
    headerName: ' ',
  },
  {
    field: 'publishedAt',
    headerName: 'Published At',
  },
  {
    cellRenderer: titleRenderer,
    colId: 'title',
    field: 'title',
    headerName: 'Video Title',
  },
  {
    field: 'description',
    headerName: 'Description',
  },
];
