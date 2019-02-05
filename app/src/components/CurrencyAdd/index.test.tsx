import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyAdd, { DropdownOption } from './index';

describe('CurrencyAdd component testing', function() {
  describe('CurrencyAdd snapshot testing', function() {
    it('should render to match snapshot with Select element', function() {
      const component: renderer.ReactTestRenderer = renderer.create(
        <CurrencyAdd
          addNew={false}
          options={[
            { value: 'AUD', label: 'Australian Dollar' },
            { value: 'CNY', label: 'Chinese Yuan' },
            { value: 'JPY', label: 'Japanese Yen' },
            { value: 'KRW', label: 'Korean Won' }
          ]}
          onSelectCurrency={jest.fn()}
          onAddCurrency={jest.fn()}
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });

    it('should render to match snapshot with button element', function() {
      const component: renderer.ReactTestRenderer = renderer.create(
        <CurrencyAdd
          addNew={true}
          options={[
            { value: 'AUD', label: 'Australian Dollar' },
            { value: 'CNY', label: 'Chinese Yuan' },
            { value: 'JPY', label: 'Japanese Yen' },
            { value: 'KRW', label: 'Korean Won' }
          ]}
          onSelectCurrency={jest.fn()}
          onAddCurrency={jest.fn()}
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('Currency method calls', function() {
    describe('handleAddCurrency', function() {
      const component: renderer.ReactTestRenderer = renderer.create(
        <CurrencyAdd
          addNew={false}
          options={[
            { value: 'AUD', label: 'Australian Dollar' },
            { value: 'CNY', label: 'Chinese Yuan' },
            { value: 'JPY', label: 'Japanese Yen' },
            { value: 'KRW', label: 'Korean Won' }
          ]}
          onSelectCurrency={jest.fn()}
          onAddCurrency={jest.fn()}
        />
      );
      const handleAddCurrency = component.root.instance.handleAddCurrency;
      const propsSpy: jest.SpyInstance = jest.spyOn(component.root.props, 'onAddCurrency');

      handleAddCurrency();
      expect(propsSpy).toHaveBeenCalled();
    });

    describe('handleSelectCurrency', function() {
      const component: renderer.ReactTestRenderer = renderer.create(
        <CurrencyAdd
          addNew={true}
          options={[
            { value: 'AUD', label: 'Australian Dollar' },
            { value: 'CNY', label: 'Chinese Yuan' },
            { value: 'JPY', label: 'Japanese Yen' },
            { value: 'KRW', label: 'Korean Won' }
          ]}
          onSelectCurrency={jest.fn()}
          onAddCurrency={jest.fn()}
        />
      );
      const mockOption: DropdownOption = { value: 'CAD', label: 'Canadian Dollar' };
      const handleSelectCurrency = component.root.instance.handleSelectCurrency;
      const propsSpy: jest.SpyInstance = jest.spyOn(component.root.props, 'onSelectCurrency');
      handleSelectCurrency(mockOption);
      expect(propsSpy).toHaveBeenCalled();
    });
  });
});
