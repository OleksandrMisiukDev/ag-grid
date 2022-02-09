import { HttpErrorResponse } from '@angular/common/http';

import { handleError } from './videos.pipes';

/* eslint-disable */
describe('Videos pipes', () => {
  let errorResponse: HttpErrorResponse;
  describe('handleError', () => {
    it('should throw an error', (done: DoneFn) => {
      errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found',
      });
      handleError(errorResponse).subscribe({
        next: (_) => done.fail('handleError fail'),
        error: (err) => {
          expect(err.message).toContain('Something bad happened');
          done();
        },
      });
    });
  });
});
