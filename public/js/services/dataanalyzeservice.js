angular.module('dataAnalyzeService', [])

	.factory('DataAnalyzer', ['$http', function($http) {
		return {
			getDataForDimensions : function(dimensions) {
				return $http.post('/api/dataanalyze/dimensions', dimensions);
			},
			getSummaryStats : function(feature) {
				return $http.post('/api/dataanalyze/summarystats', feature);
			}
		}
	}])
	;