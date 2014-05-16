'use strict';

app.controller('TestViewCtrl', function ($scope, $routeParams, Test){
  $scope.test = Test.find($routeParams.testId);

  $scope.addQuestion = function (){
    Test.addQuestion($routeParams.testId, $scope.question);
    $scope.question = '';
  };

  $scope.removeQuestion = function (question, questionId){
    Test.deleteQuestion($scope.test, question, questionId);
  };

  $scope.addAlternative = function (){
    Test.addAlternative($routeParams.testId, $scope.alternative);
    $scope.alternative = '';
  };

  $scope.removeAlternative = function (alternative, alternativeId){
    Test.deleteAlternative($scope.test, alternative, alternativeId);
  };

  $scope.upVoteTest = function (upVoted) {
    if (upVoted) {
      Test.clearVote($routeParams.testId, true);
    } else {
      Test.upVote($routeParams.testId);
    }
  };

  $scope.downVoteTest = function (downVoted) {
    if (downVoted) {
      Test.clearVote($routeParams.testId, false);
    } else {
      Test.downVote($routeParams.testId);
    }
  };

  $scope.upVoted = function () {
    return Test.upVoted($scope.test);
  };

  $scope.downVoted = function () {
    return Test.downVoted($scope.test);
  };
});