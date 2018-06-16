var app = angular.module('myapp', []);

app.factory('dbRead', function($http) {
  return {
    getData: function() {
      return $http.get('http://localhost:3000/getData');
    }
  }
})

app.controller('formone', ['$scope', '$http', '$window', 'dbRead', function($scope, $http, $window, dbRead) {

    $scope.main = dbRead.getData().success(function(resp) {
      $scope.main = resp;
    });

    $scope.sub = function(users) {
      $http.post('http://localhost:3000/dbPost', users).then(function(resp) {
        $http.get('/getData').success(function(data) {
          $scope.main = dbRead.getData().success(function(resp) {
            $scope.main = resp;
          });
        })
      })
    }
}]);
