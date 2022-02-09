import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Item, UrlParameters, VideosHttpResponse } from './videos.interfaces';
import { handleResponse } from './videos.pipes';

@Injectable()
export class VideosService {
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3/videos';
  private readonly parameters: UrlParameters = {
    part: 'snippet',
    chart: 'mostPopular',
    key: 'AIzaSyCHEWQ0jyEFGj7uD_acCqJ3tZPjMqQv7DU',
    maxResults: '50',
  };

  constructor(private httpClient: HttpClient) {}

  public getVideos(): Observable<Item[]> {
    const url = this.baseUrl + '?' + this.getPrams();
    return this.httpClient.get<VideosHttpResponse>(url).pipe(handleResponse());
  }

  private getPrams(): string {
    return Object.entries(this.parameters)
      .map(([parameter, value]) => parameter + '=' + value)
      .join('&');
  }
}
