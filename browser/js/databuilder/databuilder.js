app.config(function($stateProvider){
	$stateProvider.state('databuilder', {
		url:'/databuilder',
		templateUrl: 'js/databuilder/databuilder.html',
		controller: 'dataBuilderCtrl'
	})
})

app.controller('databuilderCtrl', function($scope, $http){
	
	
})