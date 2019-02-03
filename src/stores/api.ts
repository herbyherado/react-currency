import { baseUrl } from '../utils/baseUrl';

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

class CurrencyApi {
  fetchCurrency = async (currency: string) =>
    await fetch(`${baseUrl}/latest?base=${currency}`, options)
      .then(res => (res.ok ? res.json() : new Error('Failed to fetch')))
      .then(data => data)
      .catch(err => err);
}

const currencyApi = new CurrencyApi();

export default currencyApi;
