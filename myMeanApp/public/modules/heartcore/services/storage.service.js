(function(angular){
    var heartcoreModule = angular.module('heartcoreModule');

    heartcoreModule.service('storageService', storageService);

    
    storageService.$inject = ['store'];
    
    function storageService(store){

        var get = function(key){
            return store.get(key);
        };

        var set = function(key, value){
            store.set(key, value);
        };

        var remove = function(key){
            store.remove(key);
        }

        return {
            getFromStore : get,
            setToStore : set,
            removeFromStore : remove
        };

    }


})(window.angular);