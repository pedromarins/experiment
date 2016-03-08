var repoControllers = angular.module('repoControllers', []);

repoControllers.controller('RepoListCtrl', ['$rootScope', '$scope', '$http', 'currentRepo',
	function ($rootScope, $scope, $http, currentRepo) {


		$http.get('https://api.github.com/orgs/Netflix/repos?per_page=1000').success(function(data) {
			// console.log(data.length);
			$scope.repos = data;
		});

		$scope.carryData = function (data) {
			currentRepo.set(data);
		}
	}]);

repoControllers.controller('CommitListCtrl', ['$rootScope', '$scope', '$http', 'currentRepo', '$routeParams',
	function($rootScope, $scope, $http, currentRepo, $routeParams) {
    	$scope.repoName = $routeParams.repoName;
    	$scope.currentPage = 1;
    	$scope.totalPages = null;
    	$scope.repo = null;

		$http.get('https://api.github.com/repos/Netflix/' + $scope.repoName + '/commits?page=' + $scope.currentPage + '&per_page=20').success(function(data) {
			$scope.commits = data;
			$scope.currentPage++;
		});

		// load more 20 commits
		$scope.loadMore = function () {
			if ($scope.currentPage < $scope.totalPages) {
				$http.get('https://api.github.com/repos/Netflix/' + $scope.repoName + '/commits?page=' + $scope.currentPage + '&per_page=20').success(function(data) {
					$scope.commits.push.apply($scope.commits, data);
					$scope.currentPage++;
				});
			};
		};

		// repo data provided by currentRepo service
		(function () {
			$scope.$watch(
				function () { 
					return currentRepo.get(); 
				},
				function (newValue, oldValue) {
	        		if (newValue != null) {
	            		$scope.repo = newValue;
	        		}
	    		}, true
	    	);
	    })();

	    // get contributors and commits count
	    (function () {
		    $http.get('https://api.github.com/repos/Netflix/' + $scope.repoName + '/stats/contributors').success(function(data) {
				$scope.contributors = data;
				
				var commitsNumber = 0;
				angular.forEach($scope.contributors, function(value, key){
					commitsNumber = commitsNumber + value.total;
				});
				console.log(commitsNumber);
				$scope.totalPages = commitsNumber / 20;
			});
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