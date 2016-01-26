

app.config(function($stateProvider){
	$stateProvider.state('toDoList',{
		url:'/toDoList',
		scope: {},
		templateUrl:'js/to-do-list/toDoList.html',
	    controller: 'toDoListCtrl',
		resolve: {
			startToDos :  function($http, ToDoFactory){
				console.log(ToDoFactory)
				var getter = new ToDoFactory();
				return getter.fetch().then(function(res){
					return res
				})
			}
		}
	})
})

app.controller('toDoListCtrl', function($scope, ToDoFactory, startToDos){
	console.log(startToDos)
	$scope.toDoArray = startToDos;
	var todos = new ToDoFactory();
	$scope.getToDos = function(){
		console.log("hit ctrl")
		console.log(ToDoFactory)
		console.log("This is a new todo object", todos)
		todos.fetch().then(function(res){
			console.log(res)
		});
	}
	
	
	$scope.delete = function(id){
		todos.delete(id).then(function(res){
			console.log(res)
			todos.fetch().then(function(arr){
				$scope.toDoArray = arr
				console.log(arr)
			})	
		})
	}
	
	$scope.newTodo  = function(body){
		todos.post(body).then(function(res){
			    todos.fetch().then(function(arr){
				$scope.toDoArray = arr
				console.log(res)
				console.log(arr)
				$scope.newtodo = {}
			});	
		});
	}
})