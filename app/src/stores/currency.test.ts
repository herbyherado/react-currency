import { CurrencyStore } from './currency';
import api from './api';

const currencyNames = require('../assets/currency.json');

describe('CurrencyStore', function() {
  const store = new CurrencyStore(api, currencyNames);

  it('should have default value with new instance', function() {
    expect(store.baseCurrency).toEqual('USD');
    expect(store.baseCurrency).toBeDefined();
    expect(store.displayCurrencies).toEqual(['IDR', 'EUR', 'GBP', 'SGD']);
    expect(store.displayCurrencies).toBeDefined();
    expect(store.currencyValues).toEqual({});
    expect(store.currencyValues).toBeDefined();
    expect(store.names).toEqual(currencyNames);
    expect(store.names).toBeDefined();
    expect(store.api).toBeDefined();
  });

  describe('Class methods', function() {
    test('addCurrency', function() {
      expect(store.displayCurrencies).toHaveLength(4);
      store.addCurrency('KRW');
      expect(store.displayCurrencies).toContain('KRW');
      expect(store.displayCurrencies).toHaveLength(5);
    });

    test('removeCurrency', function() {
      expect(store.displayCurrencies).toHaveLength(5);
      store.removeCurrency(4);
      expect(store.displayCurrencies).not.toContain('KRW');
      expect(store.displayCurrencies).toHaveLength(4);
    });

    test('getCurrencyName', function() {
      const spy: jest.SpyInstance = jest.spyOn(store, 'getCurrencyName');
      store.getCurrencyName('CAD');
      expect(spy).toReturnWith('Canadian Dollar');
    });
    test('countDisplayed', function() {
      const count: number = store.countDisplayed;
      expect(count).toEqual(4);
    });
  });
});
