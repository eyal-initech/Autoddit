// React imports
import React from 'react'
import { render } from 'react-dom'
// Redux imports
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
// Router
import {
  HashRouter,
} from 'react-router-dom'
// Schemas
import rootReducer from './reducers'
import { getPosts } from './api'
import App from './app'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
