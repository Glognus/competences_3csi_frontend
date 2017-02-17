import config from '../../configuration.js'

var SERVER_BASE_URL = config.server_base_url;
var SERVER_OAUTH_URL = config.server_oauth_url;

/**
 *
 */
function login(nom, mdp, callback) {

    var ajaxCall = $.ajax({
        type: "POST",
        url: SERVER_BASE_URL + "security",
        dataType: "json",
        data: {
            user_l: nom,
            user_p: mdp
        },
        success: function (pResponse) {
            if(pResponse.success){
                localStorage.setItem('us_id', pResponse.user_id);
                localStorage.setItem('us_api_key', pResponse.api_key);
                localStorage.setItem('us_name', pResponse.user_name);
                localStorage.setItem('us_role', pResponse.user_role);
                retrieveTokenFromServer(callback);
            } else {
                callback(false);
            }
        },
        error: function (error) {
            callback(false);
        }
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
