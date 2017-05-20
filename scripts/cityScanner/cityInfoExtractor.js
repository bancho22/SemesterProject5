'use strict'

import fs from 'fs'
import jsonfile from 'jsonfile'
// const fs = require('fs') // syntax prior to es6

let fileInput = fs.readFileSync('scripts/cityScanner/cities15000.txt').toString()
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

// citiesInfo.forEach(city => {
//     console.log(city)
// })

console.log('total number of cities', citiesInfo.length)

// let cityNames = citiesInfo.map(cityInfo => cityInfo.name)

// fs.writeFileSync('scripts/bookScanner/cityNames.txt', cityNames)

let cityMongoImport = citiesInfo.map(({name, location}) => ({
    name: name,
    location: { //GeoJson Object
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
    }
}))

jsonfile.writeFile('scripts/mongo/cityMongoImport.json', cityMongoImport, {spaces: 2}, err => {
    if(err) console.log(err)
})
