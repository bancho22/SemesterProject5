var fs = require('fs');
// var ar1 = ['pepi','Hulio','Sofia','kisaijlkacsjkl','Kefish']
var ar2 = ['diddle', 'distance', 'decaying', 'kisaijlkacsjkl', 'all']
//console.log( intersect_arrays(ar1,ar2) );

const readLines = function readLines(done) {
    var remaining = '';

    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last = 0;
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            //   var izr = line.split(' ')
            //   console.log( intersect_arrays(ar1,izr) )
            func(line);
            index = remaining.indexOf('\n', last);
        }
        done(common)
        remaining = remaining.substring(last);
        // conso
    });
    
    input.on('end', function () {
        if (remaining.length > 0) {
            func(remaining);
        }
    });

    
}


function func(data) {
    //console.log('Purvo   ' + data)
    var str = data.toString();
    str = str.replace(/[\n\r]/g, ' ')
    str = str.split(' ')
    //console.log('to string' + str)
    //var dumi = data.split(' ');
    //console.log('Vtoro s split   ' + dumi)


    // dumi = dumi.toString();
    // dumi = dumi.replace(/[\n\r]/g, '')

    // console.log(dumi)
    intersect_arrays(ar2, str)
}

var common = [];

function intersect_arrays(a, b) {
    var sorted_a = a.concat().sort();
    var sorted_b = b.concat().sort();
    
    var a_i = 0;
    var b_i = 0;

    while (a_i < a.length
        && b_i < b.length) {
        if (sorted_a[a_i] === sorted_b[b_i]) {
            common.push(sorted_a[a_i]);
            a_i++;
            b_i++;
        }
        else if (sorted_a[a_i] < sorted_b[b_i]) {
            a_i++;
        }
        else {
            b_i++;
        }
    }
    return common;
}


var input = fs.createReadStream('scripts/bookScanner/exampleBook.txt');

module.exports = {
    readLines: readLines
};
