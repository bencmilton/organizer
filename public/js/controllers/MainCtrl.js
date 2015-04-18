// public/js/controllers/MainCtrl.js
app.controller('MainController', function($scope, LoginFactory) {

    $scope.user = {
        loggedIn: false,
        userinfo: {}
    };

    //logout of session
    $scope.endSession = function () {
        $scope.user.loggedIn = false;
        LoginFactory.logoutUser()
    }

});