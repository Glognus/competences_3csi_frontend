/**
 * Created by jonathan on 24/08/2016.
 */

import { push } from 'react-router-redux'

import Config from '../configuration'
import request from 'superagent'

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

//
export function login(email, password) {
    return dispatch => {

        dispatch(loginRequest());
        request
            .post(`${Config.server_base_url}security`)
            .type('form')
            .send({ user_l: email, user_p: password })
            .set('Accept', 'application/json')
            .end(function(err, res){
                if(err){
                    dispatch(loginFailure(err));
                } else {
                    const {text} = res;
                    const json = JSON.parse(text);
                    if(json.success) {
                        localStorage.setItem('us_id', json.user_id);
                        localStorage.setItem('us_api_key', json.api_key);
                        localStorage.setItem('us_name', json.user_name);
                        localStorage.setItem('us_role', json.user_role);

                        request
                            .post(Config.server_oauth_url)
                            .type('form')
                            .send({
                                client_id: "1_2lp2nq4n5acksksg8ks4w80gskg8kockggwg08w008so8gkw4s",
                                client_secret: "22b4bent9e74ggggss8wgk0s0o88w408sgw8oksggw4c000cs",
                                grant_type: "http://competences3csi.com/grants/api_key",
                                api_key: localStorage.getItem('us_api_key')
                            })
                            .set('Accept', 'application/json')
                            .end(function(err, res){

                                const {text} = res;
                                const json = JSON.parse(text);
                                localStorage.setItem('tok', json.access_token);
                                localStorage.setItem('ref_tok', json.refresh_token);
                                dispatch(push('/'));
                            });
                    } else {
                        dispatch(loginFailure("Identifiants incorrects"))
                    }

                }
            });
    }
}

export function logout(){

    return dispatch => {
        delete localStorage.tok;
        setTimeout(() => { dispatch(push('/')) }, 3000);
    }
}

//
export function loginRequest(){
    return {type: LOGIN_REQUEST}
}

//
export function loginFailure(error){
    return {type: LOGIN_FAILURE, error}
}

//
export function loginSuccess(response){
    return {type: LOGIN_SUCCESS, response}
}