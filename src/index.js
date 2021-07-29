import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import {Provider} from 'react-redux';
import {createAPI} from './services/api';
import {reducer} from './store/reducer';
import './styles/styles.scss';
import {changeAuthorizationStatus} from './store/action-creator';
import {createStore, applyMiddleware} from 'redux';
import {redirect} from './store/middlewares/redirect';
import {checkAuthorization} from './store/api-actions';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import browserHistory from './browser-history';
import {Router} from 'react-router-dom';

const api = createAPI(
    () => store.dispatch(changeAuthorizationStatus(false))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api), redirect),
    )
);

store.dispatch(checkAuthorization());

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>,
    document.getElementById(`root`)
);
