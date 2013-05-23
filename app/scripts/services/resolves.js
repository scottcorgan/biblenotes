angular.module('biblenotesApp').provider('resolves', function () {
  
  return {
    auth: function ($q, $location, User) {
      var deferred = $q.defer();
      
      User.authorize().then(function () {
        deferred.resolve()
      }, function () {
        $location.path('/login');
        deferred.reject();
      });
      
      return deferred.promise;
    },
    
    $get: function () {
      return {
      }
    }
  }
});