// public/js/app.js
var app = angular.module('organizer', ['ui.router']);

app.config(function($stateProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        // notes page that will use the NotesController
        .state('notes', {
            url: '/notes',
            templateUrl: 'views/notes.html',
            controller: 'NotesController'
        })

        // moviesList page that will use the MoviesListController
        .state('movies-list', {
            url: '/movies-list',
            templateUrl: 'views/movies-list.html',
            controller: 'MoviesListController'
        })

        // moviesList.movies page that will use the MoviesController
        .state('movies-list.movies', {
            url: '/movies/:listid/:listname/:loggedIn',
            templateUrl: 'views/movies-list.movies.html',
            controller: 'MoviesController'
        })

        // food page that will use the FoodController
        .state('food', {
            url: '/food',
            templateUrl: 'views/food.html',
            controller: 'FoodController'
        })

        // login page that will use the LoginController
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        // logout page
        .state('logout', {
            url: '/logout',
            templateUrl: 'views/logout.html',
            controller: 'MainController'
        })

        // error page that will use the ErrorController
        .state('error', {
            url: '/error',
            templateUrl: 'views/error.html',
            controller: 'ErrorController'
        })

        .state('search', {
            url: '/search',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);

});