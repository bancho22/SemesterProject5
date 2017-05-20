'use strict'

import jsonfile from 'jsonfile'
import * as mongo from '../../mongo'

function readCities() {
    return new Promise((resolve, reject) => {
        jsonfile.readFile('scripts/mongo/cityMongoImport.json', (err, obj) => {
            if (err) {
                return reject(err)
            }
            return resolve(obj)
        })
    })
}

readCities()
    .then(cities => {
        mongo.connect()
            .then(() => {
                let db = mongo.get()
                db.createCollection('cities')
                    .then(() => {
                        let col = db.collection('cities')
                        col.ensureIndex({ location: '2dsphere' })
                        col.insertMany(cities)
                            .then(res => {
                                console.log(res)
                                console.log('Success')
                                process.exit(0)
                            })
                            .catch(err => {
                                console.log(err)
                                process.exit(1)
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        process.exit(1)
                    })
            })
            .catch(err => {
                console.log(err)
                process.exit(1)
            })
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })
