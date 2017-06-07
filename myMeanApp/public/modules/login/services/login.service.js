(function (angular) {
var loginModule = angular.module('loginModule');
 
 loginModule
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', 'storageService'];
  function authentication ($http, $window, storageService) {

var isLoggedIn = false; 

var subject = new Rx.Subject();   

var currentUser = function() {
  /*if(isLoggedIn){*/
    var token = storageService.getFromStore('app-token');
    var payload = token.split('.')[1];
    payload = $window.atob(payload);
    payload = JSON.parse(payload);
    return {
      email : payload.email,
      name : payload.name
    };
  /*}*/
};

register = function(user) {
  return $http.post('/api/register', user);
};

login = function(user) {
  return $http.post('/api/login', user);
};

    return {
      register : register,
      login : login,
      isLoggedIn : isLoggedIn,
      currentUser : currentUser,
      loginSubject : subject,
    };
  }

})(window.angular);