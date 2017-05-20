'use strict'

import fs from 'fs'
// const fs = require('fs') // syntax prior to es6

let fileInput = fs.readFileSync('scripts/cities15000.txt').toString()
let splitByLines = fileInput.split('\n')

// city properties index cheat sheet
// index 1 - city name
// index 4 - latitude
// index 5 - longitude

let citiesInfo = []

splitByLines.forEach(line => { // each line corresponds to a city
    let properties = line.split('\t')
    let name = properties[1]
    let lat = +properties[4]
    let lon = +properties[5]
    if(name && !isNaN(lat) && !isNaN(lon)){
        citiesInfo.push({
            name: name,
            location: {
                latitude: lat,
                longitude: lon
            }
        })
    }
})

citiesInfo.forEach(city => {
    console.log(city)
})

console.log('total number of cities', citiesInfo.length)
