/**
 * Created by jonathan on 24/08/2016.
 */

import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS} from '../actions/actions'

//
function login(state = {session:{}}, action) {
    console.log("Login reducer");
    switch(action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                session : {
                    loggedIn: false,
                    requestPending: true,
                    error: []
                }
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                session : {
                    loggedIn: false,
                    requestPending: false,
                    error: action.error
                }
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                session : {
                    loggedIn: true,
                    requestPending: false,
                    error: []
                }
            });
        default:
            return state;
    }
}

export default login