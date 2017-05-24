'use strict'
import jsonfile from 'jsonfile'
import * as mongo from '../../mongo'

const downloadData = (coll) => {
    return new Promise((resolve, reject) => {
        mongo.get().collection(coll).find({}).toArray()
            .then(docs => {
                return resolve(docs.map(obj => {
                    if(coll !== 'cities') delete obj._id
                    return obj
                }))
            })
            .catch(err => {
                return reject(err)
            })
    })
}

mongo.connect()
    .then(() => {
        downloadData('cities')
            .then(cities => {
                jsonfile.writeFile('./cities.json', cities, {spaces: 2}, err => {
                    if(!err) console.log('Done')
                    process.exit(0)
                })
            })
        // downloadData('books')
        //     .then(books => {
        //         jsonfile.writeFile('./books.json', books, {spaces: 2}, err => {
        //             if(!err) console.log('Done')
        //             process.exit(0)
        //         })
        //     })
    })
