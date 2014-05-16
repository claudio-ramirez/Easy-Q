'use strict';

app.controller('TestsCtrl', function ($scope, $location, Test){
  if ($location.path() === '/'){
    $scope.tests = Test.all;
  }

  $scope.deleteTest = function(testId){
    Test.delete(testId);
  };

  $scope.upVoteTest = function (testId, upVoted) {
    if (upVoted) {
      Test.clearVote(testId, upVoted);
    } else {
      Test.upVote(testId);
    }
  };

  $scope.downVoteTest = function (testId, downVoted) {
    if (downVoted) {
      Test.clearVote(testId, !downVoted);
    } else {
      Test.downVote(testId);
    }
  };

  $scope.upVoted = function (test) {
    return Test.upVoted(test);
  };

  $scope.downVoted = function (test) {
    return Test.downVoted(test);
  };

});