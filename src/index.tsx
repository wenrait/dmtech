import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App.tsx';
import { GlobalStyles } from './styles/globalStyles.ts';
import { Provider } from 'react-redux';
import { store } from '../redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <GlobalStyles />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
