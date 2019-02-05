import React from 'react';
import renderer from 'react-test-renderer';
import CurrencyInput from './index';

describe('CurrencyInput component testing', function() {
  describe('CurrencyInput snapshot testing', function() {
    it('should match to snapshot', function() {
      const component: renderer.ReactTestRenderer = renderer.create(
        <CurrencyInput
          baseName="USD"
          baseFullName="United States Dollars"
          baseValue={10}
          onInputChange={jest.fn()}
        />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('CurrencyInput method calls', function() {
    describe('handleInputChange', function() {
      it('should call onInputChangeProps', function() {
        const component: renderer.ReactTestRenderer = renderer.create(
          <CurrencyInput
            baseName="USD"
            baseFullName="United States Dollars"
            baseValue={10}
            onInputChange={jest.fn()}
          />
        );

        const mockEvent = { currentTarget: { value: '42' } } as React.FormEvent<HTMLInputElement>;
        const handleInputChange = component.root.instance.handleInputChange;
        const propsSpy: jest.SpyInstance = jest.spyOn(component.root.props, 'onInputChange');

        handleInputChange(mockEvent);
        expect(propsSpy).toHaveBeenCalled();
        expect(propsSpy).toHaveBeenCalledWith(mockEvent);
      });
    });
  });
});
