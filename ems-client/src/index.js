import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import App from './App'
import Assessment from './components/Assessment'
import './css/index.css'
import * as serviceWorker from './serviceWorker';

import authorizationReducer from './store/reducers/authReducer'
import Authenticate from './components/HOC/requireAuth'
import {setAuthenticationHeader} from './utils/authenticate'

import Login from './components/assessment-components/login'
// import assessmentReducer from './store/reducers/assessment'
const rootReducer = combineReducers({
    auth: authorizationReducer, 
    // assessReducer: assessmentReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


let token = localStorage.getItem('jsonwebtoken')
setAuthenticationHeader(token)


ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/assessment" component={Authenticate(Assessment)} />
            </Switch>
        </App>
    </Provider>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
