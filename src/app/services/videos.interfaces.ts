export interface UrlParameters {
  [param: string]: string;
}

export interface Localized {
  description: string;
  title: string;
}

export interface Thumbnail {
  height: number;
  width: number;
  url: string;
}

export interface Thumbnails {
  default: Thumbnail;
  high: Thumbnail;
  maxres?: Thumbnail;
  medium: Thumbnail;
  standard?: Thumbnail;
}

export interface Snippet {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage?: string;
  defaultLanguage?: string;
  description: string;
  liveBroadcastContent: string;
  localized: Localized;
  publishedAt: string;
  tags: string[];
  thumbnails: Thumbnails;
  title: string;
}

export interface Item {
  etag: string;
  id: string;
  kind: string;
  snippet: Snippet;
}

export interface PageInfo {
  resultsPerPage: number;
  totalResults: number;
}

export interface VideosHttpResponse {
  etag: string;
  items: Item[];
  kind: string;
  nextPageToken: string;
  pageInfo: PageInfo;
}
