// public/js/controllers/MoviesCtrl.js
app.controller('LoginController', function($scope, LoginFactory, $state) {

    $scope.newuser = {
        email: null,
        password: null
    };

    $scope.userinfo = {
        email: null,
        password: null
    };

    $scope.login = function (user) {
        LoginFactory.loginUser(user)
            .then(function (data){
                $scope.user.loggedIn = true;
                console.log('user', $scope.user);
                $state.go('home');
        })
            .catch(function(user){
                $scope.user.loggedIn = false;
                console.log('user', $scope.user);
                $state.go('error');
            });
    };

    $scope.createUser = function (newuser){
        LoginFactory.createNewUser(newuser).then(function (){
        });
    };

});