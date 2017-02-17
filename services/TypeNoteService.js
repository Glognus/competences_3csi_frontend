import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';

/**
 * Builds the final URL to the resource
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "type_note/";
    if(id)
        url = url + id;
    if(suffixe)
        url = url + "/" + suffixe;
    return url + "?access_token=" + Auth.getToken();
}

/**
 * Returns all types notes from server
 * @param callback
 */
function getAllTypeNotes(callback){
    return $.get(
        getFinalURL(),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns a specific type note by id
 * @param id
 */
function getTypeNote(id){
    $.get(
        getFinalURL(id),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Posts a new type note on the server
 * @param data
 * @param callback
 */
function postTypeNote(data, callback){
    $.ajax({
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
 * Modifies an existing type note on the server
 * @param id
 * @param data
 * @param callback
 */
function putTypeNote(id, data, callback){
    $.ajax({
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
 * Deletes a type note from the server
 * @param id
 */
function deleteTypeNote(id){

}

module.exports = {
    getAll: getAllTypeNotes,
    get: getTypeNote,
    post: postTypeNote,
    put: putTypeNote,
    delete: deleteTypeNote
};
