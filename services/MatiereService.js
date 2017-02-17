import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';

/**
 * Builds the final URL to the resource
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe) {
    var url = Config.server_base_url + "matiere/";
    if(id)
        url = url + id;
    if(suffixe)
        url = url + "/" + suffixe;
    return url + "?access_token=" + Auth.getToken();
}

/**
 * Returns all matieres from server
 * @param callback
 */
function getAllMatieres(callback){
    return $.get(
        getFinalURL(),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all competences related to a specific matiere
 * @param id
 * @param callback
 */
function getMatiereCompetences(id, callback){
    return $.get(
        getFinalURL(id, "competences"),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns a specific matiere by id
 * @param id
 * @param callback
 */
function getMatiere(id, callback){
    return $.get(
        getFinalURL(id),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Posts a new matiere on server
 * @param data
 * @param callback
 */
function postMatiere(data, callback){
    return $.ajax({
        type: "POST",
        url: getFinalURL(),
        data: data,
        success: function(result){
            callback(result);
        },
        error: function(result){
            callback(false);
        },
        dataType: "json"
    });
}

/**
 * Modifies an existing matiere on the server
 * @param id
 * @param data
 * @param callback
 */
function putMatiere(id, data, callback){
    return $.ajax({
        type: "PUT",
        url: getFinalURL(id),
        data: data,
        success: function(result){
            callback(result);
        },
        error: function(result){
            callback(false);
        },
        dataType: "json"
    });
}

/**
 * Deletes a matiere from the server
 * @param id
 */
function deleteMatiere(id){

}

module.exports = {
    getAll: getAllMatieres,
    getCompetences: getMatiereCompetences,
    get: getMatiere,
    post: postMatiere,
    put: putMatiere,
    delete: deleteMatiere
};
