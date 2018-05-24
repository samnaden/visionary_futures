angular.module('visionaryfuture', ['ngRoute', 'todoService', 'dataIngestionService', 'dataAnalyzeService']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/todo', {templateUrl: 'todo.html',   controller: ToDoController}).
    when('/dataingestion', {templateUrl: 'dataingestion.html', controller: DataIngestionController}).
    when('/dataanalyze', {templateUrl: 'dataanalyze.html', controller: DataAnalyzeController}).
        otherwise({redirectTo: '/dataingestion'});
}]);