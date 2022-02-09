import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { mockItems, mockVideosHttpResponse } from '../shared/mock-data.constants';
import { VideosService } from './videos.service';

/* eslint-disable */
describe('VideosService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let videosService: VideosService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    videosService = new VideosService(httpClientSpy);
  });

  it('should be created', () => {
    expect(videosService).toBeTruthy();
  });

  it('should return expected video items (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockVideosHttpResponse));

    videosService.getVideos().subscribe({
      next: (videos) => {
        expect(videos).withContext('expected video items').toEqual(mockItems);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it("should return an undefined when the server doesn't return a 200", (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));

    videosService.getVideos().subscribe({
      next: (videos) => {
        expect(videos).toBeUndefined();
        done();
      },
    });
  });
});
