// public/js/controllers/MainCtrl.js
app.controller('MainController', function($scope, LoginFactory) {

    $scope.loggedIn = false;

    $scope.tagline = 'Home tagline!';

    $scope.endSession = function () {
        $scope.loggedIn = false;
        LoginFactory.logoutUser()
    }

});