app.controller('MoviesListController', function($scope, MoviesListFactory, $state) {

    $scope.newMovieList = '';
    $scope.moviesLists = [];

    $scope.setCurrentList = function (list, listid) {
        $scope.currentList = list;
        $scope.currentListId = listid;
        $state.go('movies-list.movies', {listid: listid, listname: list, loggedIn: true});
    };

    MoviesListFactory.populateMoviesLists()
        .then(function (lists){
            $scope.moviesLists = lists;
        })
        .catch(function(){
            $state.go('movies-list.movies', {loggedIn: false});
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
                $scope.setCurrentList($scope.moviesLists[0].listName, $scope.moviesLists[0]._id) ;
                })
            })
    }

});