import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyCard from './index';

describe('CurrencyCard component testing', function() {
  describe('CurrencyCard snapshot testing', function() {
    it('should match to snapshot', function() {
      const component = renderer.create(
        <CurrencyCard
          currencyName="CAD"
          currencyFullName="Canadian Dollar"
          currencyValue={10020}
          baseName="USD"
          baseValue={20}
          onRemoveCard={jest.fn()}
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('CurrencyCard method calls', function() {
    describe('handleRemoveCard', function() {
      it('should call onRemoveCard props', function() {
        const component = renderer.create(
          <CurrencyCard
            currencyName="CAD"
            currencyFullName="Canadian Dollar"
            currencyValue={10020}
            baseName="USD"
            baseValue={20}
            onRemoveCard={jest.fn()}
          />
        );

        const handleRemoveCard = component.root.instance.handleRemoveCard;
        const propsSpy = jest.spyOn(component.root.props, 'onRemoveCard');

        handleRemoveCard();
        expect(propsSpy).toHaveBeenCalled();
      });
    });
  });
});
