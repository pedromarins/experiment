var repoControllers = angular.module('repoControllers', []);

repoControllers.controller('RepoListCtrl', ['$scope', '$http',
	function ($scope, $http) {


		$http.get('https://api.github.com/orgs/netflix/repos?per_page=1000').success(function(data) {
			console.log(data.length);
			$scope.repos = data;
		});
	}]);

repoControllers.controller('CommitListCtrl', ['$scope', '$http', '$routeParams',
	
	function($scope, $http, $routeParams) {
    	$scope.repoName = $routeParams.repoName;
    	
		$http.get('https://api.github.com/repos/netflix/' + $scope.repoName + '/commits').success(function(data) {
			$scope.commits = data;
		});
	}]);