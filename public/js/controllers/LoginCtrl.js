// public/js/controllers/MoviesCtrl.js
app.controller('LoginController', function($scope, LoginFactory) {

    $scope.newuser = {
        email: null,
        password: null
    };

    $scope.userinfo = {
        email: null,
        password: null
    };

    $scope.login = function (user) {
        LoginFactory.loginUser(user).then(function (){
        });
    };

    $scope.createUser = function (newuser){
        LoginFactory.createNewUser(newuser).then(function (){
        });
    };

});