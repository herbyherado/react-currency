import { baseUrl } from '../utils/baseUrl';

export const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

export class CurrencyApi {
  fetchCurrency = async (currency: string) =>
    await fetch(`${baseUrl}/latest?base=${currency}`, options)
      .then(res => (res.ok ? res.json() : new Error('Failed to fetch')))
      .then(data => data)
      .catch(err => err);
}

const currencyApi = new CurrencyApi();

export default currencyApi;
