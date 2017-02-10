 
 var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
 var rps = 100
 var errors = 5;

//The goal here is to gradually increase the speed untill we get a socket hangup. 
//This method will take 5 socket hangups to find the fasted possible speed
//It will take those errors and push the value back to the call array to be reran so no values are lost.
//After the initial 5 hangups, the bot will reduce speed by 20ms for each additional hangup. 


function speedOk(){
   if (rps > 50) return true;
   else return false
 }

 function adjustSpeed() {
   if (errors > 0) {
     if (speedOk()) {
       rps -= errors;
       return true;
     } else {
       rps += 1
       errors--
       return false;
     }
   } else {
     return true;
   }
 }

 function makeCalls(element, arr) {
   if (adjustSpeed()) {
     console.log(element)
   } else {
     console.log('error')
     arr.push(element)
   }
 }


 var throttler = function (arr, i) {
   if (i < arr.length) {
     makeCalls(arr[i], arr)
     setTimeout(function () {
       throttler(arr, i)
     }, rps);

     i++;
   }
 }

 throttler(alphabet, 0);