import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MainReducer from './reducers/MainReducer';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = compose(applyMiddleware(thunk))(createStore)(MainReducer);
compose(applyMiddleware(thunk))(createStore)(MainReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
