(function (angular) {
    
angular.module('heartcoreModule',['angular-storage'])
        .config(['storeProvider',function(storeProvider){
            

            storeProvider.setStore('sessionStorage');
            
                
        }])
        .run(function(){

           
        });
})(window.angular);
