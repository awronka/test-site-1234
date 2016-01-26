app.config(function($stateProvider){
	$stateProvider.state('science', {
		 url: '/science',
        templateUrl: 'js/science/science.html',
        controller: 'ScienceCtrl'
	});
});


app.controller('ScienceCtrl', function($state, $scope, $interval){
    
    $scope.fictionalSalesData = [
        {
           year: 2005,
           grossSales: 20000,
           costsOfGoodsSold: 10000
        },
        {
           year: 2006,
           grossSales: 21345,
           costsOfGoodsSold: 11234
        },
        {
           year: 2007,
           grossSales: 25432,
           costsOfGoodsSold: 13546
        },
        {
           year: 2008,
           grossSales: 19234,
           costsOfGoodsSold: 14567
        },
        {
           year: 2009,
           grossSales: 20324,
           costsOfGoodsSold: 11234
        },
        {
           year: 2010,
           grossSales: 21324,
           costsOfGoodsSold: 12234
        },
        {
           year: 2011,
           grossSales: 22324,
           costsOfGoodsSold: 13234
        },
        {
           year: 2012,
           grossSales: 23324,
           costsOfGoodsSold: 14234
        },
        {
           year: 2013,
           grossSales: 24324,
           costsOfGoodsSold: 15234
        },
        {
           year: 2014,
           grossSales: 25324,
           costsOfGoodsSold: 16234
        },
        {
           year: 2015,
           grossSales: 26324,
           costsOfGoodsSold: 14234
        }
    ]
    
	  $scope.salesData = [
    {hour: 1,sales: 54},
    {hour: 2,sales: 66},
    {hour: 3,sales: 77},
    {hour: 4,sales: 70},
    {hour: 5,sales: 60},
    {hour: 6,sales: 63},
    {hour: 7,sales: 55},
    {hour: 8,sales: 47},
    {hour: 9,sales: 55},
    {hour: 10,sales: 30}
  ];
  
  $interval(function() {
  var hour = $scope.salesData.length + 1;
  var sales = Math.round(Math.random() * 100);
  console.log("hit")
  $scope.salesData.push({hour: hour, sales: sales});
    }, 1000, 10);
    
$scope.taskArray = [
        {
            task: "conceptualize",
            type: "development",
            startTime: "2013-1-28", //year/month/day
            endTime: "2013-2-1",
            details: "This actually didn't take any conceptualization"
        },
        
        {
            task: "sketch",
            type: "development",
            startTime: "2013-2-1",
            endTime: "2013-2-6",
            details: "No sketching either, really"
        },
        
        {
            task: "color profiles",
            type: "development",
            startTime: "2013-2-6",
            endTime: "2013-2-9"
        },
        
        {
            task: "HTML",
            type: "coding",
            startTime: "2013-2-2",
            endTime: "2013-2-6",
            details: "all three lines of it"
        },
        
        {
            task: "write the JS",
            type: "coding",
            startTime: "2013-2-6",
            endTime: "2013-2-9"
        },
        
        {
            task: "advertise",
            type: "promotion",
            startTime: "2013-2-9",
            endTime: "2013-2-12",
            details: "This counts, right?"
        },
        
        {
            task: "spam links",
            type: "promotion",
            startTime: "2013-2-12",
            endTime: "2013-2-14"
        },
        {
            task: "eat",
            type: "celebration",
            startTime: "2013-2-8",
            endTime: "2013-2-13",
            details: "All the things"
        },
        
        {
            task: "crying",
            type: "celebration",
            startTime: "2013-2-13",
            endTime: "2013-2-16"
        },
        
        ];
});

