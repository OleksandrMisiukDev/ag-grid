import { Observable, UnaryFunction, pipe, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { Item, VideosHttpResponse } from './videos.interfaces';

export const handleError = (error: HttpErrorResponse): Observable<never> => {
  if (error.status === 0) {
    /* eslint-disable no-alert, no-console */
    /* eslint-env browser */
    console.error('An error occurred:', error.error);
  } else {
    /* eslint-disable no-alert, no-console */
    /* eslint-env browser */
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
  }
  return throwError(() => new Error('Something bad happened'));
};

export function handleResponse(): UnaryFunction<Observable<VideosHttpResponse>, Observable<Item[]>> {
  return pipe(
    map((response: VideosHttpResponse) => response.items),
    retry(3),
    catchError(handleError),
  );
}
