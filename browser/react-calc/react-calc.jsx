/*
 * A simple React component
 

  let title = "0";
  var currOperand = null;
  var temp = null;
  var total = null;
  let storVal = 0;
  let equalFunc = null;
  var eqCheck = false;
  var eqPush = false;

  //add numerical values to the title 
  function addValue (num){
    if(title.indexOf('.')>0&&num==="."&&eqCheck===false){
      title +="";
    }
    else if(eqCheck===true){
      title=num+""
      eqCheck = false;
    }
    else if(title==="0"&&eqCheck===false&&num!=="."){
      if(total ===null){total=num+""}
      title=num+"";
    }
    else if(eqCheck===false){
    if(total ===null){total=num+""}
    title+= num }
  }
  
  //store title value on operation click and assign operation to equals button
  var makeOperation = {
    "+": function (x){
          if(eqPush){
            title = (Number(total)+temp)+"";
          }
          eqCheck = true;
          temp = Number(x);
          currOperand = null;
          eqPush= true;
          equalFunc = function(y){
            eqPush = false;
            if(currOperand===null){
              currOperand=Number(y)
              title = Number(x) + currOperand;        
                           }
            else{
              title = (Number(title)+currOperand)+"";}
      }
    },
    "-": function (x){
         eqCheck = true;
          currOperand = null;
          equalFunc = function(y){
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
    "/": function (x){
         eqCheck = true;
          currOperand = null;
          equalFunc = function(y){
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
    "*": function (x){
         eqCheck = true;
          currOperand = null;
          equalFunc = function(y){
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
  
  //clear the calculator and memory
  function clear(){
    console.log("works")
    title ="0";
    currVal=0;
    storVal=0;
    equalFunc = null;
    currOperand = null;
    total = null;
  }

  let objButton = {button : [[{value:"7"},{value:"8"},{value:"9"},{value:"+"}],
                             [{value:"4"},{value:"5"},{value:"6"},{value:"-"}],
                             [{value:"1"},{value:"2"},{value:"3"},{value:"*"}],
                             [{value:"."},{value:"0"},{value:"/"},{value:"="}],
                             [{value:"clear"}]], 
                   buttonFuncs: addValue,
                   operandFuncs: makeOperation,
                   clearFunc: clear}

class Button extends React.Component {
  render(){
    let cat = 7;
    return <div onClick={this.props.func} className="calc-button">{this.props.value}</div>;
  }
}


class Application extends React.Component {
  render() {
    return <div className = "calcBox">
        <div className="number-line"><div id="fitin" className='title left'><span>{title}</span></div></div>
 <div className="title"><span>Easy Calc</span></div>
<OperationsBox />
   </div>;
  }
}

class OperationsBox extends React.Component {
  constructor(props){
    super(props);
    this.state = objButton;
    this.numClick = this.numClick.bind(this);
  }
  numClick(){
    console.log("5") 
  }

  render(){
    var rows = [];
   this.state.button.forEach(function(button,index){
     var row  = button.map(function(obj, index2)
        {
           if(index===4){
              return <div className="calc-button clear">{obj.value}</div>;
         }
         return(<Button 
                
                value={obj.value}
                />);
                }.bind(this))
         rows.push(row)})

    return <div className="operations-box">
       <div className="calc-row">{rows[0]}</div>
       <div className="calc-row">{rows[1]}</div>
       <div className="calc-row">{rows[2]}</div>
       <div className="calc-row">{rows[3]}</div>
       <div className="calc-row">{rows[4]}</div>
       </div>;
     
  }
}

class CalcRow extends React.Component {
  render(){
   /* var buttons = {button: <Button/>}*/
/*    var buttons = this.state.button.map(function(button, index){
      return  (<Button value={this.state.button[index].value}/>) 
    }.bind(this))
    return <div className="calc-row">          
      </div>;
  }
}

/*
 * Render the above component into the div#app
 
React.render(<Application />, document.getElementById('app'));