import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import { updateTS } from './actions';

const initialState = {
  arm1success: 0,
  arm1failure: 0,
  arm2success: 0,
  arm2failure: 0,
  arm1ts: NaN,
  arm2ts: NaN,
  chance: 100,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'PULL': {
      let assign;
      if (action.id === 1) {
        if (action.result) {
          assign = {
            arm1success: state.arm1success + 1,
          };
        } else {
          assign = {
            arm1failure: state.arm1failure + 1,
          };
        }
      } else if (action.id === 2) {
        if (action.result) {
          assign = {
            arm2success: state.arm2success + 1,
          };
        } else {
          assign = {
            arm2failure: state.arm2failure + 1,
          };
        }
      } else {
        console.error(`action.id = ${action.id}`);
      }
      assign.chance = state.chance - 1;
      return Object.assign({}, state, assign);
    }
    case 'UPDATE_TS': {
      return Object.assign({}, state, {
        arm1ts: action.samples[0],
        arm2ts: action.samples[1],
      });
    }
    default:
      return state;
  }
}

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
