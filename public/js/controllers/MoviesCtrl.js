// public/js/controllers/MoviesCtrl.js
app.controller('MoviesController', function($scope, MoviesFactory, $stateParams) {

    $scope.currentList = $stateParams.listname;
    $scope.currentListId = $stateParams.listid;
    $scope.loggedIn = true;
    $scope.movieList = [];


    MoviesFactory.populateMovieList()
        .then(function(allMoviesArrays){
            return MoviesFactory.findCorrectArray(allMoviesArrays, $scope.currentList)
        })
        .then(function (movies){
            $scope.movieList = movies[0].movies;
        })
        .catch(function(){
            $scope.loggedIn = false;
            $scope.tagline = 'Please "<a ui-sref="login">Log in</a>';
        });


    $scope.deleteMovie = function (id){
        MoviesFactory.findAndDeleteMovie(id, $scope.currentListId)
            .then( function (newList) {
                return MoviesFactory.populateMovieList()
            .then(function(allMoviesArrays){
                return MoviesFactory.findCorrectArray(allMoviesArrays, $scope.currentList)
            })
            .then(function (movies){
                $scope.movieList = movies[0].movies;
            })
        });
    };


    $scope.submit = function () {

        if ($scope.movieTitle) {
            var title = $scope.movieTitle;

            MoviesFactory.getMovieByTitle(title, $scope.currentListId)
                .then(function (data) {
                    $scope.movieTitle = '';
                    $scope.movieList = data;
                });
        }
    }
});