app.factory("CalculatorOperations", function(){
	return {
		
    "+": function (x, eqPush, eqCheck, equalFunction, total, temp, currOperand, title){
          if(eqPush){
            title = (Number(total)+temp)+"";
          }
          eqCheck = true;
          temp = Number(x);
          currOperand = null;
          eqPush= true;
          equalFunction = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              title = Number(x) + currOperand;        
                           }
            else{
              title = (Number(title)+currOperand)+"";
            }
      }
    },
    "-": function (x, eqPush, eqCheck, equalFunction, total, temp, currOperand, title){
         eqCheck = true;
          currOperand = null;
          equalFunction = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              title = Number(x) - currOperand;        
                           }
            else{
              title = (Number(title)-currOperand)+"";
            }
      }
    },
    "/": function (x, eqPush, eqCheck, equalFunction, total, temp, currOperand, title){
         eqCheck = true;
          currOperand = null;
          equalFunction = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              title = Number(x) / currOperand;        
                           }
            else{
              title = (Number(title)/currOperand)+"";
            }
      }
    },
    "*": function (x, eqPush, eqCheck, equalFunction, total, temp, currOperand, title){
         eqCheck = true;
          currOperand = null;
          equalFunction = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              title = Number(x) * currOperand;        
                           }
            else{
              title = (Number(title)*currOperand)+"";
            }
      }
    }
	}
})