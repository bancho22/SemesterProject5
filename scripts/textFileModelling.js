var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      var lines = [];
      lines.push(line);
      //console.log(line);
      func(lines);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log(data.length)

    
  
}
function findCity(city, line) {
  return str.split(' ').some(function(w){return w === city})
}

var input = fs.createReadStream('file.txt');
readLines(input, func);