var repos = angular.module('repos', []);

repos.controller('RepoListCtrl', function ($scope, $http) {
  $http.get('https://api.github.com/orgs/netflix/repos').success(function(data) {
    $scope.repos = data;
  });
})

.controller('CommitListCtrl', function ($scope, $http) {
  $http.get('https://api.github.com/repos/netflix/astyanax/commits').success(function(data) {
    console.log(data);
    $scope.commits = data;
  });
});