(function (angular) {
    var app = angular.module('my-app');

    app.component('mainPageContent', {

        templateUrl: '/modules/app/components/global/main-page-content/maincontent.template.html',
        controller: MainContentController,
        /*require: {
        	sideNavCtrl: 'sidenavMainMenu'
        }*/
    });

    function MainContentController() {
    	var vm = this;
    	
        vm.$onInit = function(){

        }

        vm.$postLink = function(){
           
        }
       
    }

})(window.angular);

