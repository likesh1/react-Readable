import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise'
import thunk from 'redux-thunk'

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={createStoreWithMiddleware(reducers)}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.querySelector('.container'));
