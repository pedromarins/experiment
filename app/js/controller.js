var repoControllers = angular.module('repoControllers', []);

repoControllers.controller('RepoListCtrl', ['$rootScope', '$scope', '$http', 'currentRepo',
	function ($rootScope, $scope, $http, currentRepo) {


		$http.get('https://api.github.com/orgs/netflix/repos?per_page=1000').success(function(data) {
			console.log(data.length);
			$scope.repos = data;
		});

		$scope.carryData = function (data) {
			console.log(data);
			console.log(data.forks);
			currentRepo.set(data);
		}
	}]);

repoControllers.controller('CommitListCtrl', ['$rootScope', '$scope', '$http', 'currentRepo', '$routeParams',
	function($rootScope, $scope, $http, currentRepo, $routeParams) {
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
			console.log($scope.currentPage);
		};

		$scope.repo = null;
		
		(function () {
			$scope.$watch(
				function () { 
					return currentRepo.get(); 
				},
				function (newValue, oldValue) {
	        		if (newValue != null) {
	            		$scope.repo = newValue;
	            		console.log($scope.repo.forks);
	        		}
	    		}, true
	    	);
	    })();

	    // get contributors and commits count
	    (function () {
		    $http.get('https://api.github.com/repos/Netflix/' + $scope.repoName + '/stats/contributors').success(function(data) {
				$scope.contributors = data;
		})();
		
	}]);

repoControllers.service("currentRepo", function () {

	var repo = {};

	return {
	    get: function () {
	        return repo;
	    },
	    set: function (value) {
	        repo = value;
	    }
	};

});