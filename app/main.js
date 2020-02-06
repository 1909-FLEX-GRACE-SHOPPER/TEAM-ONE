import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

import store from './store';
import Root from './components/root';

render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_Pr9CMjqYSqqZbXAdWSo9BMU9003qqmipmB" >
      <Root />
    </StripeProvider>
  </Provider>,
  document.getElementById('main')
);
