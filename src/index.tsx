import * as React from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './app/store';
import "./index.css";

import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('reactAnchor');

  ReactDom.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
    </React.StrictMode>,
  container)
});
