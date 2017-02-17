/**
 * Created by jonathan on 24/08/2016.
 */

import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/reducers'

export default function configureStore(preloadedState) {
    const redirectMiddleware = routerMiddleware(browserHistory);
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, createLogger(), redirectMiddleware)
    );

    return store
}