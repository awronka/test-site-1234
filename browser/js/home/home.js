app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "homeCtrl"
    });
});

app.controller("homeCtrl", function($scope,$state, $timeout){
        
        $scope.introOver  = true;
        $scope.animate = [false,false,false,false,false,false]
      
        
});