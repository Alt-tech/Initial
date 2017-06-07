(function (angular) {
    
angular.module('loginModule',['ngRoute','ngMaterial', 'heartcoreModule'])
        .config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){

            $routeProvider.
                when('/login',{
                    template: '<login>Login Page in Login Module</login>'
                });
                
        }])
        .run(function(){

           
        });
})(window.angular);
