import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import StockReducer from "./store/StockReducer";
import UserReducer from "./store/UserReducer";
// import bookReducer from "./store/bookReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  stocks : StockReducer,
  user : UserReducer
});

const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
