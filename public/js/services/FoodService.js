// public/js/services/MoviesService.js
angular.module('FoodService', []).factory('Food', ['$http', function($http) {

    return {
        // call to get all movies
        get : function() {
            return $http.get('/api/food');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new movie
        create : function(foodData) {
            return $http.post('/api/movies', foodData);
        },

        // call to DELETE a movie
        delete : function(id) {
            return $http.delete('/api/food/' + id);
        }
    }

}]);