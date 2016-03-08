var repos = angular.module('repos', [
	'ngRoute', 'repoControllers', 'repoDirectives'
]);

repos.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/repos', {
        templateUrl: 'repo-list.html',
        controller: 'RepoListCtrl'
      }).
      when('/repos/:repoName', {
        templateUrl: 'repo-detail.html',
        controller: 'CommitListCtrl'
      }).
      otherwise({
        redirectTo: '/repos'
      });
  }]);