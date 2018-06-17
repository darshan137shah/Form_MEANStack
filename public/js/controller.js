app.controller('formone', ['$scope', '$http', '$window', 'dbRead', function($scope, $http, $window, dbRead) {
// Controller Begins

    $scope.errFlag = false;
    $scope.main = dbRead.getData().success(function(resp) {
      if(resp.length > 0) {
        $scope.trFlag = true;
        $scope.main = resp;
      } else {
        $scope.errFlag = true;
        $scope.trFlag = false;
      }
    });

    $scope.dbPost = function(users) {
      dbRead.setData(users).then(function(resp) {
        // console.log(resp)
        console.log(resp.data)
        if(resp.data) {
          $scope.main = dbRead.getData().success((resp) => {$scope.main = resp; $scope.trFlag = true; $scope.errFlag = false;})
          $scope.users = "";
           $scope.myForm.$setPristine();
        } else {
          $scope.errFlag = true;
        }
      })
    }

// Controller Ends
}]);
