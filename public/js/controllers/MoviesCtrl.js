// public/js/controllers/MoviesCtrl.js
angular.module('MoviesCtrl', []).controller('MoviesController', function($scope, MoviesFactory) {

    $scope.tagline = 'Roll camera!';

    $scope.movieList = [];

    $scope.submit = function () {

        if ($scope.movieTitle) {
            var title = $scope.movieTitle;

            MoviesFactory.getMovieByTitle(title)
                .then(function (movie) {
                    console.log(movie);
                    return  MoviesFactory.populateMovieList()
                .then(function (movies){
                        console.log(movies);
                        $scope.movieList = movies;
                    });
                });
        }
    }
});