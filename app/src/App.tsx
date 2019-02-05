import React, { Component } from 'react';
import { observer } from 'mobx-react';

import CurrencyInput from './components/CurrencyInput';
import CurrencyCard from './components/CurrencyCard';
import CurrencyAdd from './components/CurrencyAdd';

import store, { CurrencyValues, CurrencyNames } from './stores/currency';
import { DropdownOption } from './components/CurrencyAdd';
import './App.css';

@observer
class App extends Component<AppProps, AppState> {
  state: AppState = {
    baseValue: 10,
    _addNew: false
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const bigint = 9007199254740992; // maximum number allowed in JS 2^53
    let input = e.currentTarget.value;
    let selectedValue = Number(input) > bigint ? input : Number(input);
    if (!isNaN(Number(input))) {
      this.setState({ baseValue: selectedValue });
    }
  };

  handleRemoveCurrency = (index: number) => {
    if (store.countDisplayed > 1) {
      store.removeCurrency(index);
    }
  };

  handleAddCurrency = () => this.setState({ _addNew: true });

  handleSelectCurrency = (option: DropdownOption) => {
    store.addCurrency(option.value);
    this.setState({ _addNew: false });
  };

  render() {
    const { baseValue, _addNew } = this.state;
    const { baseCurrency, displayCurrencies, currencyValues, names } = this.props.store;

    return (
      <div className="App">
        <div className="App-header">
          <div className="currency-table">
            <CurrencyInput
              baseName={baseCurrency}
              baseFullName={store.getCurrencyName(baseCurrency)}
              baseValue={baseValue}
              onInputChange={(e: React.FormEvent<HTMLInputElement>) => this.handleInputChange(e)}
            />
            <div className="currency-content">
              {displayCurrencies.map((currency: string, index: number) => (
                <CurrencyCard
                  key={`currency-${index}`}
                  currencyName={currency}
                  currencyFullName={names[currency]}
                  currencyValue={currencyValues[currency]}
                  baseName={baseCurrency}
                  baseValue={baseValue}
                  onRemoveCard={() => this.handleRemoveCurrency(index)}
                />
              ))}
              <CurrencyAdd
                addNew={_addNew}
                options={store.currencyList}
                onSelectCurrency={this.handleSelectCurrency}
                onAddCurrency={this.handleAddCurrency}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

type AppState = {
  baseValue: number | string;
  _addNew: boolean;
};

type AppProps = {
  store: {
    baseCurrency: string;
    displayCurrencies: string[];
    currencyValues: CurrencyValues;
    names: CurrencyNames;
  };
};

export default App;
