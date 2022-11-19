import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { reducers } from './reducers'
import './index.css'


const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="642572922164-3oujt6v6hk8s95ttdjgndeo096j6047l.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>;
    </Provider>,
    document.getElementById('root'))