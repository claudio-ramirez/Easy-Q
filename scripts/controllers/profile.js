'use strict';

app.controller('ProfileCtrl',
  function ($scope, $routeParams, Test, User) {
    $scope.user = User.findByUsername($routeParams.username);

    $scope.questionOnTests = {};

    $scope.user.$on('loaded', function () {
      populateTests();
      populateQuestions();
    });

    function populateTests () {
      $scope.tests = {};

      angular.forEach($scope.user.tests, function(testId) {
        $scope.tests[testId] = Test.find(testId);
      });
    }

    function populateQuestions () {
      $scope.questions = {};

      angular.forEach($scope.user.questions, function(question) {
        var test = Test.find(question.testId);

        test.$on('loaded', function() {
          $scope.questions[question.id] = test.$child('questions').$child(question.id);

          $scope.questionOnTests[question.testId] = test;
        });
      });
    }
  });