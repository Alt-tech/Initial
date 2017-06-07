(function (angular) {
    var app = angular.module('my-app');

    app.component('sidenav', {

        templateUrl: '/modules/app/components/global/sidenav/sidenav.template.html',
        controller: SidenavController,
        /*require: {
        	sideNavCtrl: 'sidenavMainMenu'
        }*/
    });

    function SidenavController() {
    	var vm = this;
    	
        vm.$onInit = function(){
            //$mdSidenav('left').toggle();
            vm.isOpen = false;
            //vm.isLockedOpen = true;
        }

        vm.$postLink = function(){
           //$timeout(function(){
            //$mdSidenav('left').toggle();
           // },10); 
        }
       
    }

})(window.angular);

