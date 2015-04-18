// public/js/services/NotesService.js
angular.module('NotesService', []).factory('Notes', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/notes');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new note
        create : function(notesData) {
            return $http.post('/api/notes', nerdData);
        },

        // call to DELETE a note
        delete : function(id) {
            return $http.delete('/api/notes/' + id);
        }
    }

}]);