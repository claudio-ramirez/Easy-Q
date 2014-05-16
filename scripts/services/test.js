'use strict';

app.factory('Test', function ($firebase, FIREBASE_URL, User){
  var ref = new Firebase(FIREBASE_URL + 'tests');
  var tests = $firebase(ref);

  var Test = {
    all: tests,

    create: function(test){
      if (User.signedIn()) {
        var user = User.getCurrent();

        test.owner = user.username;

        return tests.$add(test).then(function (ref) {
          var testId = ref.name();

          user.$child('tests').$child(testId).$set(testId);

          return testId;
        });
      }
    },

    find: function(testId){
      return tests.$child(testId);
    },

    delete: function (testId) {
      if (User.signedIn()) {
        var test = Test.find(testId);

        test.$on('loaded', function () {
          var user = User.findByUsername(test.owner);

          tests.$remove(testId).then(function () {
            user.$child('tests').$remove(testId);
          });
        });
      }
    },

    addQuestion: function(testId, question){
      if (User.signedIn()){
        var user = User.getCurrent();

        question.username = user.username;
        question.testId = testId;

        tests.$child(testId).$child('questions').$add(question).then(function(ref){
          user.$child('questions').$child(ref.name()).$set({id: ref.name(), testId: testId});
        });
      }
    },

    deleteQuestion: function (test, question, questionId){
      if (User.signedIn()){
        var user = User.findByUsername(question.username);

        test.$child('questions').$remove(questionId).then(function(){
          user.$child('questions').$remove(questionId);
        });
      }
    },

    addAlternative: function(testId, alternative){
      if (User.signedIn()){
        var user = User.getCurrent();

        tests.$child(testId).$child(questionId).$child('alternatives').$add(alternative).then(function(ref){
          user.$child('alternatives').$child(ref.name()).$set({id: ref.name(), testId: testId});
        });
      }
    },

    deleteAlternative: function (test, alternative, alternativeId){
      if (User.signedIn()){
        var user = User.findByUsername(alternative.username);

        test.$child('alternatives').$remove(alternativeId).then(function(){
          user.$child('alternatives').$remove(alternativeId);
        });
      }
    },

    upVote: function (testId) {
      if (User.signedIn()) {
        var user = User.getCurrent();
        var test = tests.$child(testId);

        test.$child('upvotes').$child(user.username).$set(user.username).then(function () {
            user.$child('upvotes').$child(testId).$set(testId);
            test.$child('downvotes').$remove(user.username);
            user.$child('downvotes').$remove(testId);

            test.$child('score').$transaction(function (score) {
              if (!score) {
                return 1;
              }

              return score + 1;
            });
          });
      }
    },

    downVote: function (testId) {
      if (User.signedIn()) {
        var user = User.getCurrent();
        var test = tests.$child(testId);

        test.$child('downvotes').$child(user.username).$set(user.username).then(function () {
            user.$child('downvotes').$child(testId).$set(testId);
            test.$child('upvotes').$remove(user.username);
            user.$child('upvotes').$remove(testId);

            test.$child('score').$transaction(function (score) {
              if (score === undefined || score === null) {
                return -1;
              }

              return score - 1;
            });
          });
      }
    },

    clearVote: function (testId, upVoted) {
      if (User.signedIn()) {
        var user = User.getCurrent();
        var username = user.username;
        var test = tests.$child(testId);

        test.$child('upvotes').$remove(username);
        test.$child('downvotes').$remove(username);
        user.$child('upvotes').$remove(testId);
        user.$child('downvotes').$remove(testId);
        test.$child('score').$transaction(function (score) {
          if (upVoted) {
            return score - 1;
          } else {
            return score + 1;
          }
        });
      }
    },

    upVoted: function (test) {
      if (User.signedIn() && test.upvotes) {
        return test.upvotes.hasOwnProperty(User.getCurrent().username);
      }
    },

    downVoted: function (test) {
      if (User.signedIn() && test.downvotes) {
        return test.downvotes.hasOwnProperty(User.getCurrent().username);
      }
    }
  };
  return Test;
});