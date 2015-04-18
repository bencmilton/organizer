app.factory('MoviesFactory', function ($http) {

    return {

        getMovieByTitle: function (title, currList) {
            var req = {
                method: 'GET',
                url: '/search',
                params: {title: title, list: currList}
            };

            return $http(req)
                .then( function (list) {
                    return list.data.movies;
                });

        },

        populateMovieList: function (){

            return $http.get('/getmovies', {}).then( function(response){
                return response.data;
            });

        },

        findAndDeleteMovie: function (id, list) {
            return $http.delete('/deletemovie/'+ list +'/' + id).then( function (response){
                return response.data;
            });
        },

        findCorrectArray: function (allArrays, currList){
            return allArrays.filter(function(e){
                 return e.listName === currList

            })
        }

    };
});