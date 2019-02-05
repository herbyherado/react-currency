import { options, CurrencyApi } from './api';

jest.setTimeout(10000);

describe('CurrencyApiStore', function() {
  let apiStore = new CurrencyApi();

  describe('fetchCurrency', function() {
    let apiPromise: any;
    let promiseHelper: any;

    beforeEach(function() {
      const fakePromise: Promise<{}> = new Promise(function(resolve, reject) {
        promiseHelper = {
          resolve: resolve,
          reject: reject
        };
      });
      spyOn(window, 'fetch')
        .and.callThrough()
        .and.returnValue(fakePromise);

      apiPromise = apiStore.fetchCurrency('USD');
    });

    it('fetch latest currency', function() {
      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch).toHaveBeenCalledWith(
        'https://api.exchangeratesapi.io/latest?base=USD',
        options
      );
      expect(apiPromise).toEqual(jasmine.any(Promise));
    });

    describe('when fetch is successful', function() {
      beforeEach(function() {
        // We need to simulate a successful network response
        let response = new Response(JSON.stringify({ ok: true }));
        promiseHelper.resolve(response);
      });

      it('resolves its promise with the current response', function(done) {
        // We need our returned promise to have passed along the response
        apiPromise.then(function(ok: boolean) {
          expect(ok).toEqual({ ok: true });
          done();
        });
      });
    });
  });
});
