import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

import store from './stores/currency';

it('renders without crashing', function() {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App component testing', function() {
  describe('App snapshot test', function() {
    it('Should render to match snapshot', function() {
      const component = renderer.create(<App store={store} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('App method calls', function() {
    const component = renderer.create(<App store={store} />);

    describe('handleInputChange', function() {
      const setStateSpy = jest.spyOn(App.prototype, 'setState');
      const handleInputChange = component.root.instance.handleInputChange;

      it('should not call setState with incorrect input', function() {
        const mockedEvent = { currentTarget: { value: '  a12' } };
        handleInputChange(mockedEvent);
        expect(setStateSpy).toBeCalledTimes(0);
      });

      it('should call setState with correct input', function() {
        const mockedEvent = { currentTarget: { value: '12' } };

        handleInputChange(mockedEvent);
        expect(setStateSpy).toHaveBeenCalled();
        expect(setStateSpy).toBeCalledTimes(1);
      });
    });

    describe('handleRemoveCurrency', function() {
      test('should successfully call store action', function() {
        const handleRemoveCurrency = component.root.instance.handleRemoveCurrency;
        const displayCurrencies = store.displayCurrencies;
        const storeSpy = jest.spyOn(store, 'removeCurrency');
        expect(store.countDisplayed).toBe(4);

        handleRemoveCurrency(1);
        expect(displayCurrencies).toHaveLength(3);
        expect(storeSpy).toHaveBeenCalled();
      });

      test('should not call store action', function() {
        const handleRemoveCurrency = component.root.instance.handleRemoveCurrency;
        const displayCurrencies = store.displayCurrencies;

        expect(store.countDisplayed).toBe(3);
        handleRemoveCurrency(2);
        handleRemoveCurrency(1);
        expect(displayCurrencies).toHaveLength(1);
        handleRemoveCurrency(0);
        expect(displayCurrencies).toHaveLength(1);
      });
    });

    describe('handleAddCurrency', function() {
      const setStateSpy = jest.spyOn(App.prototype, 'setState');
      const handleAddCurrency = component.root.instance.handleAddCurrency;

      test('should call setState', function() {
        handleAddCurrency('CAD');
        expect(setStateSpy).toBeCalled();
      });
    });

    describe('handleSelectCurrency', function() {
      const setStateSpy = jest.spyOn(App.prototype, 'setState');
      const handleSelectCurrency = component.root.instance.handleSelectCurrency;

      test('should call state & action', function() {
        const mockOption = { value: 'CAD', label: 'Canadian Dollar' };
        handleSelectCurrency(mockOption);
        expect(store.displayCurrencies).toContain('CAD');
        expect(setStateSpy).toBeCalled();
      });
    });
  });
});
