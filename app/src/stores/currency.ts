import { configure, computed, observable, autorun, runInAction, action } from 'mobx';
import api from './api';

const currencyNames = require('../assets/currency.json');

configure({ enforceActions: 'observed' });

export class CurrencyStore {
  @observable.ref baseCurrency: string = 'USD';
  @observable.shallow displayCurrencies: string[] = ['IDR', 'EUR', 'GBP', 'SGD'];
  @observable.ref currencyValues: CurrencyValues = {};
  @observable.ref names: CurrencyNames = {};
  @observable api: any;

  constructor(api: any, names: CurrencyNames) {
    this.api = api;
    this.names = names;
  }

  @action
  fetchCurrency = async () => {
    const currentCurrencies = await this.api.fetchCurrency(this.baseCurrency);
    runInAction(() => {
      delete currentCurrencies.rates[this.baseCurrency];
      this.currencyValues = currentCurrencies.rates;
    });
  };

  @action
  addCurrency = (currency: string) => this.displayCurrencies.push(currency);

  @action
  removeCurrency = (index: number) => this.displayCurrencies.splice(index, 1);

  getCurrencyName = (currency: string) => this.names[currency];

  @computed
  get currencyList() {
    const list = Object.keys(this.names).filter(
      currency =>
        this.currencyValues.hasOwnProperty(currency) &&
        this.displayCurrencies.indexOf(currency) === -1
    );

    return list.map(currency => ({
      value: currency,
      label: `${currency} - ${this.names[currency]}`
    }));
  }

  @computed
  get countDisplayed() {
    return this.displayCurrencies.length;
  }
}

const store = new CurrencyStore(api, currencyNames);

autorun(() => {
  store.fetchCurrency();
});

export interface CurrencyValues {
  [currency: string]: number;
}

export interface CurrencyNames {
  [name: string]: string;
}

export default store;
