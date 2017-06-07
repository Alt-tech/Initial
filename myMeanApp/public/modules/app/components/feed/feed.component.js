(function (angular) {
    var app = angular.module('my-app');

    app.component('feed', {

        templateUrl: '/modules/app/components/feed/feed.template.html',
        controller: FeedController,
       
    });
    FeedController.$inject = ['Upload', '$http', 'storageService'];
    function FeedController(Upload, $http, storageService) {
    	var vm = this;
    	
        vm.$onInit = function(){

            vm.upload = function(file){
            if(file)
                vm.file = file;
            }

            vm.submitFeed = function(){
                //Not using $http but using Upload Method as content type should be multipart/form-data and boundary
                //should also be supported as $http does not support these
               /* $http({
                                method: 'POST',
                                url: '/upload/feed',
                                headers: {
                                    Authorization: 'Bearer '+ storageService.getFromStore('app-token') ,
                                },
                                data : vm.feed
                            }).then(function(result){
                               
                                console.log(result);

                            },function(error){
                                console.log(error);
                            })*/
                            Upload.upload({
                                url: '/upload/feed',
                                headers: {
                    'Authorization':'Bearer '+ storageService.getFromStore('app-token') 
                 },
                data: {'file': vm.file[0], text: vm.feed.text}, 
                method: 'POST',
            }).then(function (resp) {
            	console.log('upload successfull');
                console.log(resp);
            }, function (resp) {
                console.log('Error in uploading');
                console.log(resp);
            }, function (evt) {        	
                //vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
            }
        
        }

        vm.$postLink = function(){
            
        }
       
    }

})(window.angular);

