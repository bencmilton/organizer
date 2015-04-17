app.controller('MoviesListController', function($scope, MoviesListFactory, $state) {

    $scope.newMovieList = '';

    $scope.moviesLists = [];

    $scope.setCurrentList = function (list, listid) {

        $scope.currentList = list;
        $scope.currentListId = listid;
        $state.go('movies-list.movies', {listid: listid, listname: list});
    };

    MoviesListFactory.populateMoviesLists()
        .then(function (lists){
            //console.log(lists)
            $scope.moviesLists = lists;
        })
        .catch(function(){
            $scope.tagline = 'Please "<a ui-sref="login">Log in</a>';
        });

    $scope.createMovieList = function (list) {
        MoviesListFactory.createList(list)
            .then( function () {
                return MoviesListFactory.populateMoviesLists()
            .then( function (lists) {
                $scope.moviesLists = lists;
                $scope.newMovieList.name = '';
                });
            });
    };

    $scope.deleteList = function (id) {
        MoviesListFactory.removeList(id)
            .then( function () {
                return MoviesListFactory.populateMoviesLists()
            .then (function (lists) {
                $scope.moviesLists = lists;
                })
            })
    }

});