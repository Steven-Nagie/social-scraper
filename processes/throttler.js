// more than 20 rps is too fast. 

var rps = 200
var i = 0;
var errors = 5;

function speedOk(){
  if(rps > 50) return true;
  else return false
}
//if its a socket hangup, push the request back into the array to 

function getRequest(){
  console.log('rps = ', (1000 / rps).toFixed(2))
  if(errors  > 0){
    if(speedOk()) rps -= errors;
    else {
      console.log('error')
      rps += 1
      errors--
    }
  }
  else if (errors === 5) {
    rps += 5;
    errors++
  }
}

var throttler = function(){
    if(i < 100) {
      
        getRequest();
        
        setTimeout(function() {
          throttler()
        }, rps); 
        
        i++;
    }
}

throttler()

//Now we have the data inputing at its maximum capacity, we can input the ENOTFOUND errors back into the array. 
//Next I need to work out how to direct the traffic to the right end. 