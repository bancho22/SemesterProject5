'use strict'

import jsonfile from 'jsonfile'

let cities = jsonfile.readFileSync('./cities.json')

let citiesObj = {}

cities.map(city => {
    citiesObj[city._id] = city.name
})

jsonfile.writeFile('./citiesAsObj.json', citiesObj, {spaces: 2}, err => {
    if(!err) console.log('Done')
})
