app.config(function ($stateProvider) {

    $stateProvider.state('entry_one', {
        url: '/entry_one',
        templateUrl: 'js/entry_one/entry_one.html',
        controller: 'FirstEntryCtrl'
    });

});

app.controller('FirstEntryCtrl', function ($scope, AuthService, $state, CalculatorOperations) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };
    
      $scope.title = "0";
  var currOperand = null;
  var temp = null;
  var total = null;
  $scope.storVal = 0;
  $scope.equalFunc = null;
  var eqCheck = false;
  var eqPush = false;
  

  //add numerical values to the title 
  $scope.addValue= function(num){
    if($scope.title.indexOf('.')>0&&num==="."&&eqCheck===false){
      $scope.title +="";
    }
    else if(eqCheck===true){
      $scope.title=num+""
      eqCheck = false;
    }
    else if($scope.title==="0"&&eqCheck===false&&num!=="."){
      if(total ===null){total=num+""}
      $scope.title=num+"";
    }
    else if(eqCheck===false){
    if(total ===null){total=num+""}
    $scope.title+= num }
  }
  
  //store title value on operation click and assign operation to equals button
  $scope.makeOperation = {
    "+": function (x){
          if(eqPush){
            $scope.title = (Number(total)+temp)+"";
          }
          eqCheck = true;
          temp = Number(x);
          currOperand = null;
          eqPush= true;
          $scope.equalFunc = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              $scope.title = Number(x) + currOperand;        
                           }
            else{
              $scope.title = (Number($scope.title)+currOperand)+"";
            }
      }
    },
    "-": function (x){
         eqCheck = true;
          currOperand = null;
          $scope.equalFunc = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              $scope.title = Number(x) - currOperand;        
                           }
            else{
              $scope.title = (Number($scope.title)-currOperand)+"";
            }
      }
    },
    "/": function (x){
         eqCheck = true;
          currOperand = null;
          $scope.equalFunc = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              $scope.title = Number(x) / currOperand;        
                           }
            else{
              $scope.title = (Number($scope.title)/currOperand)+"";
            }
      }
    },
    "*": function (x){
         eqCheck = true;
          currOperand = null;
          $scope.equalFunc = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              $scope.title = Number(x) * currOperand;        
                           }
            else{
              $scope.title = (Number($scope.title)*currOperand)+"";
            }
      }
    }
  }
  
  //clear the calculator and memory
  $scope.clear= function(){
    console.log("works")
    $scope.title ="0";
    $scope.currVal=0;
    $scope.storVal=0;
    $scope.equalFunc = null;
    currOperand = null;
    total = null;
  }

});


// add commas to large numbers
// var addCommas = function(str){
//   var arr = str.split("");
//   console.log(arr)
//   var newStr = [];
//   var count = arr.length + (3-arr.length%3);
//   for(var i = arr.length-1; i >= 0; i--){
//     count--;
//    console.log(count)
//     if(count%3===0){
//         newStr.unshift(arr[i])
//         newStr.unshift(',')
//     }
//     else
//     newStr.unshift(arr[i]);
//   }
//     newStr = newStr.join('')
//     if(newStr[0]===",")return newStr.slice(1)
//     return newStr
// }