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
    citiesInfo.push({
        name: properties[1],
        location: {
            latitude: properties[4],
            longitude: properties[5]
        }
    })
    // properties.forEach(property => {
    //     console.log(property)
    // })
    // console.log('---------------------------------------------------------------')
})

citiesInfo.forEach(city => {
    console.log(city)
})

console.log('total number of cities', citiesInfo.length)
