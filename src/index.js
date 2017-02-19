import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import reducer from './reducers';
import { updateTS } from './actions';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.dispatch(updateTS());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'));
