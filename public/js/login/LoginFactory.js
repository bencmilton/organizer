app.factory('LoginFactory', function ($http, $location) {

    return {

        loginUser: function (userinfo) {
            return $http.post('/login', userinfo)
            .then(function(response){
                if (response.status === 200) return response.data
            })
        },

        createNewUser: function (newuser) {
            return $http.post('/signup', newuser).then(function(user){
                $location.url('/');
            })
        },

        logoutUser: function () {
            return $http.get('logout').then(function (){
                $location.url('/');
            })
        }
    }

});