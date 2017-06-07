(function (angular) {
    var app = angular.module('my-app');

    app.component('mainApp', {

        templateUrl: '/modules/app/components/global/app/app.template.html',
        controller: AppController,
        /*require: {
        	sideNavCtrl: 'sidenavMainMenu'
        }*/
    });

    function AppController($mdSidenav, $timeout) {
    	var vm = this;
    	
        vm.$onInit = function(){

        }

        vm.$postLink = function(){
           /* $timeout(function(){
            $mdSidenav('left').toggle();
            },10);*/
        }
       
    }

})(window.angular);

