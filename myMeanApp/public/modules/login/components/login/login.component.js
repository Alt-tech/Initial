(function (angular) {
    var loginModule = angular.module('loginModule');

    loginModule.component('login', {

        templateUrl: '/modules/login/components/login/login.template.html',
        controller: LoginController,
        /*require: {
        	sideNavCtrl: 'sidenavMainMenu'
        }*/
    });
    LoginController.$inject = ['authentication', '$location', 'storageService'];
    function LoginController(authentication, $location, storageService) {
    	var vm = this;
    	
        vm.$onInit = function(){
            vm.submitSignInForm = function(){
                authentication.login(vm.signinUser).then(function(result){
                    console.log('authentication done');
                    storageService.setToStore('app-token', result.data.token);
                    $location.path('/home');
                },function(error){
                    console.log('inside error');
                });
            };

            vm.submitSignUpForm = function(){
                 authentication.register(vm.signupUser).then(function(data){
                    console.log('Registration done');
                },function(error){
                    console.log('inside error registration');
                });
            };
        }

        vm.$postLink = function(){
           
        }
       
    }

})(window.angular);

