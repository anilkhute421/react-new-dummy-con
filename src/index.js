import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/Store";
import { Provider } from "react-redux";
import App from './App';


ReactDOM.render(
  <Provider store={store}>
  <PersistGate persistor={persistor}>
    <App />
  </PersistGate>
</Provider>,
  document.getElementById('root')
);

