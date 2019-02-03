import React, { PureComponent } from 'react';
import './index.css';

const localeOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4
};

class CurrencyCard extends PureComponent<CurrencyCardProps> {
  handleRemoveCard = () => {
    this.props.onRemoveCard();
  };

  render() {
    const { currencyName, currencyValue, currencyFullName, baseName, baseValue } = this.props;

    return (
      <div className="card">
        <div className="card-content">
          <div className="card-name">
            <p>{currencyName}</p>
            {currencyValue ? (
              <p className="card-number">
                {(currencyValue * baseValue).toLocaleString('en', localeOptions)}
              </p>
            ) : null}
          </div>
          <div className="card-footer">
            <p className="text-italic text-bolder">
              {currencyName} - {currencyFullName}
            </p>
            <p className="text-italic">
              1 {baseName} = {currencyName}{' '}
              {currencyValue ? currencyValue.toLocaleString('en', localeOptions) : null}
            </p>
          </div>
        </div>
        <button className="card-delete" onClick={this.handleRemoveCard}>
          -
        </button>
      </div>
    );
  }
}

type CurrencyCardProps = {
  currencyName: string;
  currencyFullName: string;
  currencyValue: number;
  baseName: string;
  baseValue: number;
  onRemoveCard: () => void;
};

export default CurrencyCard;
