app.directive('goToLogin', function () {
    return {
        restrict: 'E',
        template: '<p ng-hide="user.loggedIn">Please <a ui-sref="login">Login</a> to See Your {{pageTitle}}</p>'
    };
});