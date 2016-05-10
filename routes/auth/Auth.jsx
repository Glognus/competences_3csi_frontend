var SERVER_BASE_URL = "http://192.168.100.10/web/app_dev.php/api/";
var SERVER_OAUTH_URL = "http://192.168.100.10/web/app_dev.php/oauth/v2/token";

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
    success:function(pResponse){
      localStorage.setItem('us_id', pResponse.user_id);
      localStorage.setItem('us_api_key', pResponse.api_key);
      localStorage.setItem('us_name', pResponse.user_name);
      localStorage.setItem('us_role', pResponse.user_role);

      retrieveTokenFromServer(callback);
    },
    error:function(error){
      console.log(error);
    }
  });
}

/**
 *
 */
function logout() {
  delete localStorage.tok
  if (cb) cb()
    this.onChange(false)
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
      client_secret:"22b4bent9e74ggggss8wgk0s0o88w408sgw8oksggw4c000cs",
      grant_type: "http://competences3csi.com/grants/api_key",
      api_key: localStorage.getItem('us_api_key')
    },
    success:function( pResponse ){
      localStorage.setItem('tok', pResponse.access_token);
      localStorage.setItem('ref_tok', pResponse.refresh_token);

      callback(true);
    },
    error:function(error){
      console.log(error);
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
function getToken(){
  return localStorage.getItem("tok");
}

/**
 *
 */
function loggedIn() {
  return !!getToken();
}

/**
 *
 */
function getUsers()
{
    $.ajax({
        type: "GET",
        url: "http://192.168.100.10/web/app_dev.php/api/matiere/",
        dataType: "json",
        data: {
            "access_token": localStorage.getItem('tok')
        },
        success:function( pResponse ){
            console.log(pResponse);
        },
        error:function(error){
            console.log(error);
        }
    });
}

module.exports = {

  login: login,
  logout: logout,
  retrieveTokenFromServer: retrieveTokenFromServer,
  getToken: getToken,
  loggedIn: loggedIn,
  onChange() {}
}
