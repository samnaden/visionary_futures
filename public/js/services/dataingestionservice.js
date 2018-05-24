angular.module('dataIngestionService', [])

	.factory('Cookies', ['$http',function($http) {
		return {
			loadCollection : function() {
				return $http.post('/api/dataingestion/cookies/loadcollection');
			},
			wipeCollection : function() {
				return $http.delete('/api/dataingestion/cookies/wipecollection');
			}
		}
	}])

	.factory('Sodas', ['$http',function($http) {
		return {
			loadCollection : function() {
				return $http.post('/api/dataingestion/sodas/loadcollection');
			},
			wipeCollection : function() {
				return $http.delete('/api/dataingestion/sodas/wipecollection');
			}
		}
	}])

	.factory('DatePriceWeatherLoc', ['$http',function($http) {
		return {
			loadCollection : function() {
				return $http.post('/api/dataingestion/datepriceweatherloc/loadcollection');
			},
			wipeCollection : function() {
				return $http.delete('/api/dataingestion/datepriceweatherloc/wipecollection');
			}
		}
	}])
	
	;