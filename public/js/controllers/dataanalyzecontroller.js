function DataAnalyzeController($http, $scope, DataAnalyzer){
	
	$scope.showDataOverview = true;
	$scope.showSummaryStats = false;
	$scope.showCorrelationPlots = false;

	$scope.dataModel;

	var dateDimension = "Date";
	var entityList = [dateDimension, "US_gas_pump_price", "Midwest_gas_pump_price", "Gulf_coast_gas_pump_price", "Settle", "Volume",
	"Miami_PRCP", "Miami_TMIN", "Miami_TMAX", "Freeport_PRCP", "Freeport_TMIN", "Freeport_TMAX", "NewOrleans_PRCP",
	"NewOrleans_TMIN", "NewOrleans_TMAX", "Chicago_PRCP", "Chicago_TMIN", "Chicago_TMAX"
	];
	var entityListNoDate = Array.from(entityList);
	var indexToRemove = entityListNoDate.indexOf(dateDimension);
	entityListNoDate.splice(indexToRemove, 1);
	var precipUnit = "mm";
	var tempUnit = "degrees C";
	var entityUnitMap = {"US_gas_pump_price" : "$", "Midwest_gas_pump_price" : "$", "Gulf_coast_gas_pump_price" : "$", "Settle" : "$", "Volume" : "",
	"Miami_PRCP" : precipUnit, "Miami_TMIN" : tempUnit, "Miami_TMAX" : tempUnit, "Freeport_PRCP" : precipUnit, "Freeport_TMIN": tempUnit, "Freeport_TMAX": tempUnit, "NewOrleans_PRCP" : precipUnit,
	"NewOrleans_TMIN": tempUnit, "NewOrleans_TMAX": tempUnit, "Chicago_PRCP": precipUnit, "Chicago_TMIN": tempUnit, "Chicago_TMAX": tempUnit
	};

	$scope.featureSelections = entityList;
	$scope.featureSelection = entityList[0];
	$scope.minimumFeatureVal;
	$scope.maximumFeatureVal;
	$scope.averageFeatureVal;
	$scope.summaryStatUnit;
	$scope.numNullsFeatureVal;

	$scope.axisSelections = entityListNoDate;
	$scope.xAxisSelection = entityListNoDate[1];
	$scope.yAxisSelection = entityListNoDate[11];

	$scope.onDataOverviewClick = function() {
		setViewVariables(true, false, false);
		var jsonDataModel = {"Date": {"type": "Date"}, "US_gas_pump_price": {"type": "Number"}, "Midwest_gas_pump_price": {"type": "Number"}, "Gulf_coast_gas_pump_price": {"type": "Number"}, "Settle": {"type": "Number"}, "Volume": {"type": "Number"}, "Miami_PRCP": {"type": "Number"}, "Miami_TMIN": {"type": "Number"}, "Miami_TMAX": {"type": "Number"}, "Freeport_PRCP": {"type": "Number"}, "Freeport_TMIN": {"type": "Number"}, "Freeport_TMAX": {"type": "Number"}, "NewOrleans_PRCP": {"type": "Number"}, "NewOrleans_TMIN": {"type": "Number"}, "NewOrleans_TMAX": {"type": "Number"}, "Chicago_PRCP": {"type": "Number"}, "Chicago_TMIN": {"type": "Number"}, "Chicago_TMAX": {"type": "Number"}};
		$scope.dataModel = jsonDataModel;
		//todo: call a service to retrieve number of documents
		$scope.totalNumDocuments = 8322;
	};

	$scope.onDataOverviewClick();

	$scope.onSummaryStatsClick = function() {
		setViewVariables(false, true, false);
		$scope.onFeatureSelectionChange();
	};

	$scope.onFeatureSelectionChange = function() {
		DataAnalyzer.getSummaryStats({"feature": $scope.featureSelection})
			.success(function(data){
				$scope.numNullsFeatureVal = data.numNulls;
				if($scope.featureSelection != dateDimension){
					var divideBy = 1;
					if(precipUnit == eval("entityUnitMap." + $scope.featureSelection) || tempUnit == eval("entityUnitMap." + $scope.featureSelection)){
						//for temp and precipitation divide by 10 since original units are in tenths of degrees and tenths of mm, respectively
						//todo: this conversion should happen in the ETL process
						divideBy = 10;
					}
					$scope.minimumFeatureVal = data.min/divideBy;
					$scope.maximumFeatureVal = data.max/divideBy;
					$scope.averageFeatureVal = data.avg/divideBy;
					$scope.summaryStatUnit = eval("entityUnitMap." + $scope.featureSelection);
				} else{
					$scope.minimumFeatureVal = data.min;
					$scope.maximumFeatureVal = data.max;
					$scope.averageFeatureVal = "";
				}
			})
	};

	$scope.onCorrelationPlotsClick = function() {
		setViewVariables(false, false, true);
	};

	$scope.onShowPlotClick = function() {
		if(!($scope.xAxisSelection && $scope.yAxisSelection)){
			alert("Select a variable from each dropdown.");
			return;
		}

		//remove the plot
		$("#scatterchartcontainer").empty();

		DataAnalyzer.getDataForDimensions({"dimensions": [$scope.xAxisSelection, $scope.yAxisSelection]})
			.success(function(retrievedData) {
				//plotting code taken from http://bl.ocks.org/bunkat/2595950
				//data is an array of data points, e.g. [[-3,3], [10,-17], [15,4], [2,8]]
				var data = retrievedData.dataPoints;
			   
			    var margin = {top: 20, right: 15, bottom: 60, left: 60}
			      , width = 960 - margin.left - margin.right
			      , height = 500 - margin.top - margin.bottom;

			    //here we are specifying that the x axis should be normalized from 0 to width
			    var x = d3.scale.linear()
			              .domain([d3.min(data, function(d) { return d[0]; }), d3.max(data, function(d) { return d[0]; })])
			              .range([ 0, width ]);

			    //here we are specifying that the y axis should be normalized from 0 to height
			    var y = d3.scale.linear()
			    	      .domain([d3.min(data, function(d) { return d[1]; }), d3.max(data, function(d) { return d[1]; })])
			    	      .range([ height, 0 ]);
			 
			    var chart = d3.select('#scatterchartcontainer')
				.append('svg:svg')
				.attr('width', width + margin.right + margin.left)
				.attr('height', height + margin.top + margin.bottom)
				.attr('class', 'chart')

			    var main = chart.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
				.attr('width', width)
				.attr('height', height)
				.attr('class', 'main')   
			        
			    // draw the x axis
			    var xAxis = d3.svg.axis()
				.scale(x)
				.orient('bottom');

			    main.append('g')
				.attr('transform', 'translate(0,' + height + ')')
				.attr('class', 'main axis date')
				.call(xAxis);

			    // draw the y axis
			    var yAxis = d3.svg.axis()
				.scale(y)
				.orient('left');

			    main.append('g')
				.attr('transform', 'translate(0,0)')
				.attr('class', 'main axis date')
				.call(yAxis);

			    var g = main.append("svg:g"); 
			    
			    g.selectAll("scatter-dots")
			      .data(data)
			      .enter().append("svg:circle")
			          .attr("cx", function (d,i) { return x(d[0]); } )
			          .attr("cy", function (d) { return y(d[1]); } )
			          .attr("r", 8);
			});
	};

	function setViewVariables(showDataOverview, showSummaryStats, showCorrelationPlots){
		$scope.showDataOverview = showDataOverview;
		$scope.showSummaryStats = showSummaryStats;
		$scope.showCorrelationPlots = showCorrelationPlots;
	}
}