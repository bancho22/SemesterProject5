'use strict'

import { get as getConn } from './mongo'


module.exports = (test) => {
    
    if(test) console.log('Using MongoDB in test mode')

    const books_col = !test ? 'books' : 'books_test'
    const cities_col = !test ? 'cities' : 'cities_test'
    
    return {

        getBooksByCity: cityName => {
            return new Promise((resolve, reject) => {
                getConn().collection(cities_col).find({name: cityName}).toArray()
                    .then(res => {
                        if(res && res[0]){
                            let cityId = res[0]._id
                            getConn().collection(books_col).find({citiesMentioned: cityId}).toArray()
                                .then(res => {
                                    return resolve(res.map(({author, title}) => ({author, title})))
                                })
                                .catch(err => {
                                    console.log(err)
                                    return reject(err)
                                })
                        }
                        else{
                            return reject('No such city')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return reject(err)
                    })
            })
        },

        getCitiesByBook: bookTitle => {
            return new Promise((resolve, reject) => {
                getConn().collection(books_col).find({title: bookTitle}).toArray()
                    .then(res => {
                        if(res && res[0]){
                            let cityIds = res[0].citiesMentioned
                            getConn().collection(cities_col).find({
                                _id: {
                                    '$in': cityIds
                                }
                            }).toArray()
                                .then(res => {
                                    return resolve(res.map(({name, location}) => ({name, lat: location.coordinates[1], lon: location.coordinates[0]})))
                                })
                                .catch(err => {
                                    console.log(err)
                                    return reject(err)
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return reject(err)
                    })
            })
        }
    }
}
