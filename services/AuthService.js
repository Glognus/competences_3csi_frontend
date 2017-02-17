import Config from '../configuration'
import request from 'superagent'

let SERVER_OAUTH_URL = Config.server_oauth_url;

/**
 *
 */
function login(nom, mdp, callback) {

    request
        .post(`${Config.server_base_url}security`)
        .type('form')
        .send({ user_l: nom, user_p: mdp })
        .set('Accept', 'application/json')
        .end(function(err, res){
            console.log(err);
            console.log(res);
        });
}

/**
 *
 */
function logout() {
    delete localStorage.tok
}
/**
 *
 */
function retrieveTokenFromServer(callback) {
    $.ajax({
        type: "GET",
        url: SERVER_OAUTH_URL,
        dataType: "json",
        data: {
            client_id: "1_2lp2nq4n5acksksg8ks4w80gskg8kockggwg08w008so8gkw4s",
            client_secret: "22b4bent9e74ggggss8wgk0s0o88w408sgw8oksggw4c000cs",
            grant_type: "http://competences3csi.com/grants/api_key",
            api_key: localStorage.getItem('us_api_key')
        },
        success: function (pResponse) {
            localStorage.setItem('tok', pResponse.access_token);
            localStorage.setItem('ref_tok', pResponse.refresh_token);

            callback(true);
        },
        error: function (error) {
        }
    });
}

/**
 *
 */
function getUserInfo() {
    return {
        "user_id": localStorage.getItem('us_id'),
        "user_name": localStorage.getItem('us_name'),
        "user_role": localStorage.getItem('us_role')
    }
}

/**
 *
 */
function getToken() {
    return localStorage.getItem("tok");
}

/**
 *
 */
function loggedIn() {
    return !!getToken();
}

module.exports = {
    login: login,
    logout: logout,
    retrieveTokenFromServer: retrieveTokenFromServer,
    getUserInfo:getUserInfo,
    getToken: getToken,
    loggedIn: loggedIn,
    onChange() {
    }
}
/**
 * Created by jonathan on 24/08/2016.
 */
