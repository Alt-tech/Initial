(function (angular) {
    var app = angular.module('my-app');

    app.component('menubar', {

        templateUrl: '/modules/app/components/global/menubar/menubar.template.html',
        controller: MenubarController,
        bindings: {
            sidenavIsOpen: '='
        }
        /*require: {
        	sideNavCtrl: 'sidenavMainMenu'
        }*/
    });
    MenubarController.$inject = ['authentication'];
    function MenubarController(authentication) {
    	var vm = this;
        vm.isLoggedIn = false;
        vm.loggedInName = null;
    	
        vm.$onInit = function(){
            authentication.loginSubject.subscribe(function(subscribedData){
                vm.isLoggedIn = subscribedData.isLoggedIn;
                if(vm.isLoggedIn){
                    vm.loggedInName = authentication.currentUser().name;
                }
            });
        }

        vm.$postLink = function(){
           
        }
       
    }

})(window.angular);

