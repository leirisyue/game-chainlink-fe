function fibonacci(num) {
   var answer = [];
   var x = 0;
   var y = 1;
   var z;
   answer.push(x);
   answer.push(y);

   var i = 2;
   while (i < num) {
      z = x + y;
      x = y;
      y = z;
      answer.push(z);
      i = i + 1;
   }
   return answer;
}

var num = 8;
answer = fibonacci(num);

console.log("The Fibonacci series is till the 8th term is: ", answer);