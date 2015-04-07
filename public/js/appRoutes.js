// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // notes page that will use the NotesController
        .when('/notes', {
            templateUrl: 'views/notes.html',
            controller: 'NotesController'
        })

        // movies page that will use the MoviesController
        .when('/movies', {
            templateUrl: 'views/movies.html',
            controller: 'MoviesController'
        })

        // food page that will use the FoodController
        .when('/food', {
            templateUrl: 'views/food.html',
            controller: 'FoodController'
        })

        .when('/search', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);

}]);