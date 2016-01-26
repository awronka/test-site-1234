app.config(function($stateProvider){
	$stateProvider.state("game_one", {
		url: "/game_one",
		templateUrl: "js/game_one/game_one.html",
		controller: "GameOneCtrl"
	});
});

app.controller("GameOneCtrl", function($state, $scope){
	$scope.game = {
		difficulty: "select your difficulty",
		size: "select your board size"
	};
	$scope.gameSet = false;
	
	$scope.boxArray=[];
	
	$scope.logVal = function(){
		console.log($scope.gameSet)
	}
	
	$scope.reveal = []
	
	$scope.play = true;
	
	$scope.win = false;
	
	var winScore = 0;
	
	$scope.makeGameBoard =  function(){
		if($scope.gameSet === false){
			$scope.gameSet = true;
			for(var i = 0; i< Math.pow($scope.game.size, 2); i++){
			    var mines = Math.floor(Math.random()*10);
				$scope.reveal.push(false);
				if(mines >=$scope.game.difficulty){
					winScore++;
					$scope.boxArray.push({num:"*"})
					}
				else {
					$scope.boxArray.push({num:" "});
					}
			}
			$scope.boxArray = numAssign($scope.boxArray, $scope.game.size);
			$scope.boxArray = chunk($scope.boxArray, $scope.game.size);
			$scope.reveal = chunk($scope.reveal, $scope.game.size)
		}
	}
	
	$scope.clearBoard = function(node,val, col, row){
		if($scope.play === true&&$scope.win===false){
			val[col][row] = true;
			if(node[col][row].num ==" "){
				clearBox(node,val,col,row+1)
				clearBox(node,val,col,row-1)
				clearBox(node,val,col+1,row)
				clearBox(node,val,col+1,row+1)
				clearBox(node,val,col+1,row-1)
				clearBox(node,val,col-1,row)
				clearBox(node,val,col-1,row+1)
				clearBox(node,val,col-1,row-1)
			}
			if(node[col][row].num == "*"){
				for(var i = 0; i<node.length; i++){
					for(var j = 0; j<node[i].length; j++){
						if(node[i][j].num=="*")val[i][j]= true;
					}
				}
				$scope.play = false;
			}
			winScore--;
		}
		if(winScore === 0){
			$scope.win = true;
			
		}
	
	}
	
	function clearBox(node, val, col, row){
		if(!node[col])return;
		if(!node[col][row])return;
		if(val[col][row]==true)return;
		if(typeof node[col][row].num == "number"){
			 val[col][row]= true;
			 return;
			 }
		else if(node[col][row].num =="*"){
			return;
		}
		else{
			val[col][row] = true;
			clearBox(node,val,col,row+1)
			clearBox(node,val,col,row-1)
			clearBox(node,val,col+1,row)
			clearBox(node,val,col+1,row+1)
			clearBox(node,val,col+1,row-1)
			clearBox(node,val,col-1,row)
			clearBox(node,val,col-1,row+1)
			clearBox(node,val,col-1,row-1)
		}
	}
	
	function numAssign(arr, size){
		size = Number(size)
		var newArr = [];
		for (var i=0; i<arr.length; i++) {
			var k = 0;
			if(arr[i].num===" "){
				if(arr[i+1]){
					if(arr[i+1].num==="*")k++;
				}
				if(arr[i-1]){
					if(arr[i-1].num==="*")k++;
				}
				if(arr[i+size]){
					if(arr[i+size].num==="*")k++;
				}
				if(arr[i+size+1]){
					if(arr[i+size+1].num==="*")k++;
				}
				if(arr[i+size-1]){
					if(arr[i+size-1].num==="*")k++;
				}
				if(arr[i-size]){
					if(arr[i-size].num==="*")k++;
				}
				if(arr[i-size+1]){
					if(arr[i-size+1].num==="*")k++;
				}
				if(arr[i-size-1]){
					if(arr[i-size-1].num==="*")k++;
				}
				if(k!==0){
				arr[i].num = k;	
				}
			}
		}
		return arr;
	}
	
	function chunk(arr, size) {
		size = Number(size)
		var newArr = [];
		for (var i=0; i<arr.length; i+=size) {
			newArr.push(arr.slice(i, i+size));
		}
		return newArr;
	}

	
	
	$scope.reset = function(){
		$scope.gameSet = false;
		$scope.boxArray= [];
		$scope.reveal = [];
		$scope.play = true;
	}
});