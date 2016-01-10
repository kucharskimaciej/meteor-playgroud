angular.module('socially')
    .config(function($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        //$urlRouterProvider.otherwise('/parties');
    })
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                $state.go('parties');
            }
        });
    });