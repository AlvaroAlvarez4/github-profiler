'use strict';

angular.module('githubApp.github-user', [
  'ngRoute',
  'ui.router',
  'ngResource',
  'ui.bootstrap'
])

/**
 * Config
 */

.config([
  '$stateProvider',
  function($stateProvider) {

    $stateProvider.state('github.user', {
      url: '/:username',
      templateUrl: 'github-user/github-user.html',
      controller: 'githubUserCtrl'
    });

  }
])

/**
 * Authorizations resource
 */

.controller('githubUserCtrl', [
  '$scope', '$state', 'Github',
  function ($scope, $state, Github) {
    $scope.showRepo = false;

    Github.getuser({
      username: $state.params.username
    })
    .$promise.then(function (data) {
      $scope.userData = data;
    }, function (error) {
      $scope.errorfound = error;
    });

    // shows all the repo for a particular user
    $scope.showDetails = function (username) {
      $state.go('github.user.repo', { username: username });
      $scope.showUser = false;
      $scope.showRepo = true;
    };
  }
]);