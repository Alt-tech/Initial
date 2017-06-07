(function (angular) {
    
angular.module('my-app',['ngRoute','ngMaterial', 'ngAnimate', 'ngMessages', 'gridster', 'chart.js', 'loginModule', 'ngFileUpload'])
        .config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
            $locationProvider.hashPrefix(''); //Stops changing # to '%2f' in url
            $routeProvider.
                when('/feed',{
                    template: '<feed></feed>',
                    resolve: {
                        getFeeds: ['$http', 'storageService',function($http, storageService){
                            return $http({
                                method: 'GET',
                                url: '/upload/getFeeds',
                                headers: {
                                    Authorization: 'Bearer '+ storageService.getFromStore('app-token') 
                                }
                            }).then(function(result){
                               
                                console.log(result);

                            },function(error){
                                console.log('unable to get feeds from backend');
                            })
                        }]
                    }
                }).
                when('/home',{
                    template: '<home></home>',
                    resolve: {
                        profile : ['$http', 'storageService', 'authentication', function($http, storageService, authentication){
                            return $http({
                                method: 'GET',
                                url: '/home/profile',
                                headers: {
                                    Authorization: 'Bearer '+ storageService.getFromStore('app-token') 
                                }
                            }).then(function(result){
                                authentication.isLoggedIn = true;
                                authentication.loginSubject.onNext({
                                    isLoggedIn : true
                                });
                                console.log(result);

                            },function(error){
                                console.log('unable to fetch profile');
                            })
                        }],
                        createSidemenu : ['$http',function($http){
                            /*return $http({
                                method: 'POST',
                                url: '/sidemenu/create',
                                data: {id: 2, item: 'Contact Us', pageUrl: '/contact', parentId: null}
                            }).then(function(result){
                                console.log('sidemenu item created');
                                console.log(result);
                            },function(error){
                                console.log(error);
                            })*/
                        }],
                        sidemenuItems : ['$http',function($http){
                            return $http({
                                method: 'GET',
                                url: '/sidemenu/getAll',
                            }).then(function(result){
                                console.log('Recieved All Sidemenu Items');
                                console.log(result);
                            },function(error){
                                console.log(error);
                            })
                        }]
                    }
                }).
                otherwise({
                    template: '<login>Login Page</login>'
                });

                $locationProvider.html5Mode({
                    enabled : true,
                    requireBase : false
                });
        }])
        .run(function(){

            console.log('App Loaded...');
        });
})(window.angular);
