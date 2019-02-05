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
      const component: renderer.ReactTestRenderer = renderer.create(<App store={store} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('App method calls', function() {
    const component: renderer.ReactTestRenderer = renderer.create(<App store={store} />);

    describe('handleInputChange', function() {
      const setStateSpy: jest.SpyInstance = jest.spyOn(App.prototype, 'setState');
      const { handleInputChange } = component.root.instance;

      it('should not call setState with incorrect input', function() {
        const mockedEvent = { currentTarget: { value: '  a12' } } as React.FormEvent<
          HTMLInputElement
        >;
        handleInputChange(mockedEvent);
        expect(setStateSpy).toBeCalledTimes(0);
      });

      it('should call setState with correct input', function() {
        const mockedEvent = { currentTarget: { value: '12' } } as React.FormEvent<HTMLInputElement>;

        handleInputChange(mockedEvent);
        expect(setStateSpy).toHaveBeenCalled();
        expect(setStateSpy).toBeCalledTimes(1);
      });
    });

    describe('handleRemoveCurrency', function() {
      test('should successfully call store action', function() {
        const { handleRemoveCurrency } = component.root.instance;
        const { displayCurrencies } = store;
        const storeSpy: jest.SpyInstance = jest.spyOn(store, 'removeCurrency');
        expect(store.countDisplayed).toBe(4);

        handleRemoveCurrency(1);
        expect(displayCurrencies).toHaveLength(3);
        expect(storeSpy).toHaveBeenCalled();
      });

      test('should not call store action', function() {
        const handleRemoveCurrency = component.root.instance.handleRemoveCurrency;
        const { displayCurrencies } = store;

        expect(store.countDisplayed).toBe(3);
        handleRemoveCurrency(2);
        handleRemoveCurrency(1);
        expect(displayCurrencies).toHaveLength(1);
        handleRemoveCurrency(0);
        expect(displayCurrencies).toHaveLength(1);
      });
    });

    describe('handleAddCurrency', function() {
      const setStateSpy: jest.SpyInstance = jest.spyOn(App.prototype, 'setState');
      const { handleAddCurrency } = component.root.instance;

      test('should call setState', function() {
        handleAddCurrency('CAD');
        expect(setStateSpy).toBeCalled();
      });
    });

    describe('handleSelectCurrency', function() {
      const setStateSpy: jest.SpyInstance = jest.spyOn(App.prototype, 'setState');
      const { handleSelectCurrency } = component.root.instance;

      test('should call state & action', function() {
        const mockOption = { value: 'CAD', label: 'Canadian Dollar' };
        handleSelectCurrency(mockOption);
        expect(store.displayCurrencies).toContain('CAD');
        expect(setStateSpy).toBeCalled();
      });
    });
  });

  describe('Shallow component testing', function() {
    const component: renderer.ReactTestRenderer = renderer.create(<App store={store} />);
    describe('CurrencyInput component', function() {
      test('should call component method', function() {
        const mockEventInput = { currentTarget: { value: '58' } } as React.FormEvent<
          HTMLInputElement
        >;
        const functionSpy: jest.SpyInstance = jest.spyOn(
          component.root.instance,
          'handleInputChange'
        );
        const currencyInput = component.toTree()!.rendered!.props.children.props.children.props
          .children[0];
        const { onInputChange } = currencyInput.props;
        onInputChange(mockEventInput);

        expect(functionSpy).toHaveBeenCalled();
        expect(functionSpy).toHaveBeenCalledWith(mockEventInput);
      });
    });

    describe('CurrencyCard component', function() {
      test('should call component method', function() {
        const mockIndex: number = 0;
        const functionSpy: jest.SpyInstance = jest.spyOn(
          component.root.instance,
          'handleRemoveCurrency'
        );

        const currencyCard = component.toTree()!.rendered!.props.children.props.children.props
          .children[1].props.children[0];
        const { onRemoveCard } = currencyCard[mockIndex].props;

        onRemoveCard();
        expect(functionSpy).toBeCalled();
        expect(functionSpy).toBeCalledWith(mockIndex);
      });
    });
  });
});
