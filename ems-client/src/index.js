import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './store/reducer'
import App from './App'
import Assessment from './components/Assessment'
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App>
            <Switch>
                <Route path="/assessment" component={Assessment} />
            </Switch>
        </App>
    </Provider>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
