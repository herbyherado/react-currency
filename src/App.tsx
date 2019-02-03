import React, { Component } from 'react';
import { observer } from 'mobx-react';

import CurrencyInput from './components/CurrencyInput';
import CurrencyCard from './components/CurrencyCard';
import CurrencyAdd from './components/CurrencyAdd';

import currencyStore, { CurrencyValues, CurrencyNames } from './stores/currency';
import { DropdownOption } from './components/CurrencyAdd';
import './App.css';

@observer
class App extends Component<AppProps, AppState> {
  state: AppState = {
    baseValue: 10,
    _addNew: false
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.currentTarget.value))) {
      this.setState({ baseValue: Number(e.currentTarget.value) });
    }
  };

  handleRemoveCurrency = (index: number) => {
    if (currencyStore.countDisplayed > 1) {
      currencyStore.removeCurrency(index);
    }
  };

  handleAddCurrency = () => this.setState({ _addNew: true });

  handleSelectCurrency = (option: DropdownOption) => {
    currencyStore.addCurrency(option.value);
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
              baseFullName={currencyStore.getCurrencyName(baseCurrency)}
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
                options={currencyStore.currencyList}
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
  baseValue: number;
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
