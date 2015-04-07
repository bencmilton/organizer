// public/js/controllers/MoviesCtrl.js
angular.module('MoviesCtrl', []).controller('MoviesController', function($scope, MoviesFactory) {

    $scope.tagline = 'Roll camera!';

    $scope.movieList = [];

    $scope.submit = function () {

        if ($scope.text) {
            var title = $scope.text;

            MoviesFactory.getMovieByTitle(title).then(function (movie) {
                console.log(movie);
                $scope.movieList = movie.title + " (" + movie.year + ")";
                $scope.poster = movie.posters.thumbnail;
            });

        }
    }

});