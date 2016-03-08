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
    	$scope.currentPage = 1;
    	$scope.totalPages = 1;

		$http.get('https://api.github.com/repos/netflix/' + $scope.repoName + '/commits?page=' + $scope.currentPage + '&per_page=20').success(function(data) {
			$scope.commits = data;
			$scope.currentPage++;
		});

		$scope.loadMore = function () {
			$http.get('https://api.github.com/repos/netflix/' + $scope.repoName + '/commits?page=' + $scope.currentPage + '&per_page=20').success(function(data) {
				$scope.commits.push.apply($scope.commits, data);
				console.log($scope.commits);
				$scope.currentPage++;
			});

			$scope.currentPage++;
		}
	}]);