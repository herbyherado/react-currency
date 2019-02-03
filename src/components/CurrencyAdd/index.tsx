import React, { PureComponent } from 'react';
import Select from 'react-select';

import './index.css';

class CurrencyAdd extends PureComponent<CurrencyAddProps> {
  handleAddCurrency = () => {
    this.props.onAddCurrency();
  };

  handleSelectCurrency = (option: any) => {
    this.props.onSelectCurrency(option);
  };

  render() {
    const { addNew, options } = this.props;

    return addNew ? (
      <Select
        className="select-currency"
        value={null}
        options={options}
        onChange={this.handleSelectCurrency}
      />
    ) : (
      <button type="button" onClick={this.handleAddCurrency} className="currency-add">
        Add More Currencies
      </button>
    );
  }
}

export interface DropdownOption {
  label: string;
  value: string;
}

type CurrencyAddProps = {
  addNew: boolean;
  options: DropdownOption[];
  onAddCurrency: () => void;
  onSelectCurrency: (option: DropdownOption) => void;
};

export default CurrencyAdd;
