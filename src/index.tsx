import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import './index.css';
import { store } from './store';
import ReactDOM from 'react-dom/client';


// const container = document.getElementById('root')!;
// const root = createRoot(container);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <Provider store={store}>
    <App />
  </Provider>
);


