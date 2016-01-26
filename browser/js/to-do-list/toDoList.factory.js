'use strict';

app.factory('ToDoFactory', function ($http) {
	
	// Constructor
	function ToDoFactory (props) {
		angular.extend(this, props);
	}
	ToDoFactory.url = '/api/toDos/';
	
	Object.defineProperty(ToDoFactory.prototype, 'url', {
	get: function(){
		return ToDoFactory.url + this._id;
	}
	});
		// Get This
	ToDoFactory.prototype.fetch = function () {
		console.log("hit factory")
		console.log(this.url)
		return $http.get(ToDoFactory.url)
			.then(function (suc) {
				
				console.log(suc)
				return suc.data;
			})
	}
	
	ToDoFactory.prototype.post = function(body){
		return $http.post(ToDoFactory.url, body).then(function(res){
			console.log(res);
			return res.data;
		})
	}
	
	ToDoFactory.prototype.delete = function(id){
		return $http.delete(ToDoFactory.url + id).then(function(res){
			console.log(res)
			return res.data;
		})
	}
	
	return ToDoFactory;
});