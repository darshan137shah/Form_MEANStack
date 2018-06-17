app.controller('formone', ['$scope', '$http', '$window', 'dbRead', function($scope, $http, $window, dbRead) {
// Controller Begins

    // $scope.errFlag = false;
    $scope.main = dbRead.getData().success(function(resp) {
      if(resp.length > 0) {
        $scope.trFlag = true;
        $scope.main = resp;
        console.log($scope.main);
      } else {
        $scope.errFlag = false;
        $scope.trFlag = false;
      }
    });

    $scope.dbPost = function(users) {
      dbRead.setData(users).then(function(resp) {
        if(resp.data) {
          $scope.main = dbRead.getData().success((resp) => {$scope.main = resp; $scope.trFlag = true; $scope.errFlag = false;})
          $scope.users = "";
           $scope.myForm.$setPristine();
        } else {
          $scope.errFlag = true;
        }
      })
    }

    $scope.delete = function($event) {
      dbRead.remData({'id': $event.target.id}).then(function(resp) {
        console.log(resp);
      });
      $scope.main = dbRead.getData().success((resp) => {
        $scope.main = resp; $scope.trFlag = true; $scope.errFlag = false;
        if(resp.length == 0) {
          $scope.trFlag = false;
        }
      });

    }

// Controller Ends
}]);
