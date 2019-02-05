import React, { PureComponent } from 'react';
import './index.css';

class CurrencyInput extends PureComponent<CurrencyInputProps> {
  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onInputChange(e);
  };

  render() {
    const { baseFullName, baseName, baseValue } = this.props;
    return (
      <div className="currency-input">
        <p className="currency-input-detail text-italic">
          {baseName} - {baseFullName}
        </p>
        <div className="currency-input-body">
          <p className="currency-input-text">{baseName}</p>
          <input
            type="text"
            placeholder="Value"
            value={baseValue}
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

type CurrencyInputProps = {
  baseName: string;
  baseFullName: string;
  baseValue: number | string;
  onInputChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

export default CurrencyInput;
