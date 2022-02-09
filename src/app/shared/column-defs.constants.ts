import { ColDef } from 'ag-grid-community';

/* eslint-disable */
export enum COL_FIELDS {
  CHECKBOX_SELECTION = 'CHECKBOX_SELECTION',
  THUMBNAIL = 'thumbnail',
  PUBLISHED_AT = 'publishedAt',
  TITLE = 'title',
  DESCRIPTION = 'description',
}

export enum COL_HEADER_NAMES {
  CHECKBOX_SELECTION = ' ',
  THUMBNAIL = ' ',
  PUBLISHED_AT = 'Published At',
  TITLE = 'Video Title',
  DESCRIPTION = 'Description',
}

export const DEFAULT_COL_DEF: ColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
};
