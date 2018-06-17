var app = angular.module('myapp', []);

//======================
//========Services======
//======================

app.factory('dbRead', function($http) {
  return {
    getData: function() {
      return $http.get('http://localhost:3000/getData');
    },

    setData: function(users) {
      return $http.post('http://localhost:3000/dbPost', users);
    }
  }
})
