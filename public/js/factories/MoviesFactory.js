app.factory('MoviesFactory', function ($http) {

    return {

        getMovieByTitle: function (title) {

            var req = {
                method: 'GET',
                url: '/search',
                params: {title: title}
            };

            return $http(req)
                .then( function (movie) {
                return movie.data.movies[0];
                });

        },

        populateMovieList: function (){

            return $http.get('/getmovies', {}).then( function(response){
                return response.data;
            });

        }

    };
});