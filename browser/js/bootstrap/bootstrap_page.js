app.config(function($stateProvider){
	$stateProvider.state('boot_strapped',{
		url: "/boot_strapped",
		templateUrl: "js/bootstrap/bootstrap.html",
		controller: 'BootCtrl'
	})
});

app.controller('BootCtrl', function($state, $scope){
	
})