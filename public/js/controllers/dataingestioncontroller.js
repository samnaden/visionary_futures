function DataIngestionController($http, $scope, Cookies, Sodas, DatePriceWeatherLoc){

	$scope.wipeCookieCollection = function() {
		Cookies.wipeCollection()
			.success(function(data) {
				alert(data.status);
			});
	};

	$scope.loadCookieCollection = function() {
		Cookies.loadCollection()
			.success(function(data) {
				alert(data.status);
			});
	};

	$scope.wipeSodaCollection = function() {
		Sodas.wipeCollection()
			.success(function(data) {
				alert(data.status);
			});
	};

	$scope.loadSodaCollection = function() {
		Sodas.loadCollection()
			.success(function(data) {
				alert(data.status);
			});
	};

	$scope.wipeDatePriceWeatherLocCollection = function() {
		DatePriceWeatherLoc.wipeCollection()
			.success(function(data) {
				alert(data.status);
			});
	};

	$scope.loadDatePriceWeatherLocCollection = function() {
		DatePriceWeatherLoc.loadCollection()
			.success(function(data) {
				alert(data.status);
			});
	};
}