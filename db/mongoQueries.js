'use strict'

import { get as getConn } from './mongo'


module.exports = (test) => {
    
    if(test) console.log('Using MongoDB in test mode')

    const books_col = !test ? 'books' : 'books_test'
    const cities_col = !test ? 'cities' : 'cities_test'


    const findCitiesByIds = (cityIds) => {
        return new Promise((resolve, reject) => {
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
        })
    }
    


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
                            findCitiesByIds(cityIds)
                                .then(res => {
                                    return resolve(res)
                                })
                                .catch(err => {
                                    return reject(err)
                                })
                        }else{
                            return reject('No cities found')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return reject(err)
                    })
            })
        },



        getBooksByAuthor: bookAuthor => {
            return new Promise((resolve, reject) => {
                getConn().collection(books_col).find({author: bookAuthor}).toArray()
                    .then(res => {
                        if(res && res.length > 0){
                            return resolve(res.map(book => book.title))
                        }else{
                            return reject('No books found')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return reject(err)
                    })
            })
        },



        getCitiesByAuthor: bookAuthor => {
            return new Promise((resolve, reject) => {
                getConn().collection(books_col).find({author: bookAuthor}).toArray()
                    .then(res => {
                        if(res && res.length > 0){
                            let cityIds = []
                            res.forEach(book => {
                                book.citiesMentioned.forEach(cityId => {
                                    if(!cityIds.includes(cityId)) cityIds.push(cityId)
                                })
                            })
                            findCitiesByIds(cityIds)
                                .then(res => {
                                    return resolve(res)
                                })
                                .catch(err => {
                                    return reject(err)
                                })
                        }else{
                            return reject('No books found')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return reject(err)
                    })
            })
        },



        getBooksByGeoLocation: (loc, radius) => {
            return new Promise((resolve, reject) => {
                getConn().collection(cities_col).find({
                    location: {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [loc.lon, loc.lat]
                            },
                            $maxDistance: radius * 1000 // radius (km -> m)
                        }
                    }
                }).toArray()
                    .then(res => {
                        if(res && res.length > 0){
                            let cityIds = res.map(city => {
                                return city._id
                            })
                            getConn().collection(books_col).find({
                                citiesMentioned: {
                                    '$in': cityIds
                                }
                            }).toArray()
                                .then(res => {
                                    if(res && res.length > 0){
                                        return resolve(res.map(book => book.title))
                                    }else{
                                        return reject('No books found')
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                    return reject(err)
                                })
                        }else{
                            return reject('No cities found')
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
