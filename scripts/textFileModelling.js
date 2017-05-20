var fs = require('fs');
var ar1 = ['pepi','Sofia','kisaijlkacsjkl']
var ar2 = ['Stonheg','Copenhagen','Male']
console.log( intersect_arrays(ar1,ar2) );

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      
      func(line);
      index = remaining.indexOf('\n', last);
      
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}
function func(data) {
    var dumi = data.split(' ');
    

    
 console.log( intersect_arrays(ar1,dumi) );
}

function intersect_arrays(a, b) {
    var sorted_a = a.concat().sort();
    var sorted_b = b.concat().sort();
    var common = [];
    var a_i = 0;
    var b_i = 0;

    while (a_i < a.length
           && b_i < b.length)
    {
        if (sorted_a[a_i] === sorted_b[b_i]) {
            common.push(sorted_a[a_i]);
            a_i++;
            b_i++;
        }
        else if(sorted_a[a_i] < sorted_b[b_i]) {
            a_i++;
        }
        else {
            b_i++;
        }
    }
    return common;
}
var input = fs.createReadStream('file.txt');
readLines(input, func);