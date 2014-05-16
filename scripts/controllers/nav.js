'use strict';

app.controller('NavCtrl', function ($scope, $location, Test, Auth){
  $scope.test = {category: '', description: '', title: ''};

  $scope.submitTest = function () {
    Test.create($scope.test).then(function (testId) {
      $location.path('/tests/' + testId);
      $scope.test = {category: '', description: '', title: ''};
    });
  };

  $scope.logout = function(){
    Auth.logout();
  };
});