(function (angular) {
    var app = angular.module('my-app');

    app.component('rightDropdown', {

        templateUrl: '/modules/app/components/global/right-dropdown/rightDropdown.template.html',
        controller: DropdownController,
        bindings: {
            loggedInUser: '<'
        }
    });
    DropdownController.$inject = ['authentication', '$location', 'storageService'];
    function DropdownController(authentication, $location, storageService) {
    	var vm = this;
    	
        vm.$onInit = function(){
            vm.logout = function(){
                storageService.removeFromStore('app-token');
                authentication.isLoggedIn = false;
                authentication.loginSubject.onNext({
                isLoggedIn: false
            });
                $location.path('/login');
            }

            vm.gotoFeed = function(){
                $location.path('/feed');
            }
        }

        vm.$postLink = function(){
           
        }
       
    }

})(window.angular);

