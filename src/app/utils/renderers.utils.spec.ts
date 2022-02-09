import { ICellRendererParams } from 'ag-grid-community';

import { thumbnailRenderer, titleRenderer } from './renderers.utils';
import { mockVideoGridRowItem } from '../shared/mock-data.constants';

/* eslint-disable */
describe('Rernderes utils', () => {
  let params = { data: mockVideoGridRowItem } as ICellRendererParams;
  describe('thumbnailRenderer', () => {
    it('should return string with html', () => {
      const result = '<img alt="title" src="img">';
      expect(thumbnailRenderer(params)).toBe(result);
    });
  });

  describe('titleRenderer', () => {
    it('should return string with html', () => {
      const result = '<a href="https://www.youtube.com/watch?v=id">title</a>';
      expect(titleRenderer(params)).toBe(result);
    });
  });
});
