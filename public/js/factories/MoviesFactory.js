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

        }

    };
});