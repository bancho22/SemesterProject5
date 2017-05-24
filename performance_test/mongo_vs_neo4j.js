'use strict'

import { Promise } from 'bluebird'
import {
    connect,
    close
} from '../db/mongo'


const mongoDB = require('../db/mongoQueries')()
const neo4j = require('../db/neo4jQueries')


const compareGettingBooksByCity = () => {
    return new Promise((resolve, reject) => {
        let randomCities = ['Ajman', 'Montana', 'Erechim', 'Mondragone', 'Ouardenine']

        console.time('mongo_gettingBooksByCity')

        Promise.map(randomCities, cityName => {
            return mongoDB.getBooksByCity(cityName)
        }, {concurrency: 1})
            .then(res => {
                // console.log('mongo res', res.length)
                console.log('mongo book count returned')
                res.forEach(q => {
                    console.log(q.length)
                })
                console.timeEnd('mongo_gettingBooksByCity')
                console.time('neo4j_gettingBooksByCity')
                Promise.map(randomCities, cityName => {
                    return neo4j.getBookByCity(cityName)
                }, {concurrency: 1})
                    .then(res => {
                        // console.log('neo4j res', res)
                        console.log('neo4j book count returned')
                        res.forEach(q => {
                            console.log(q.records.length)
                        })
                        console.timeEnd('neo4j_gettingBooksByCity')
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}



const compareGettingCitiesByBook = () => {
    return new Promise((resolve, reject) => {
        let randomBooks = ['Egocentric Orbit', 'Odd Charges', 'Selected Poems', 'The Book of the Cat', 'The Mouse and The Moonbeam']

        console.time('mongo_gettingCitiesByBook')

        Promise.map(randomBooks, bookTitle => {
            return mongoDB.getCitiesByBook(bookTitle)
        }, {concurrency: 1})
            .then(res => {
                // console.log('mongo res', res.length)
                console.log('mongo book count returned')
                res.forEach(q => {
                    console.log(q.length)
                })
                console.timeEnd('mongo_gettingCitiesByBook')
                console.time('neo4j_gettingCitiesByBook')
                Promise.map(randomBooks, bookTitle => {
                    return neo4j.getCitiesByBook(bookTitle)
                }, {concurrency: 1})
                    .then(res => {
                        // console.log('neo4j res', res)
                        console.log('neo4j book count returned')
                        res.forEach(q => {
                            console.log(q.records.length)
                        })
                        console.timeEnd('neo4j_gettingCitiesByBook')
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}



const compareGettingBooksByAuthor = () => {
    return new Promise((resolve, reject) => {
        let randomAuthors = ['Eugene Field', 'Anonymous', 'Lloyd Neil Goble', 'Jean Baptiste Poquelin de Moliere', 'Jan Kochanowski']

        console.time('mongo_gettingBooksByAuthor')

        Promise.map(randomAuthors, author => {
            return mongoDB.getBooksByAuthor(author)
        }, {concurrency: 1})
            .then(res => {
                // console.log('mongo res', res.length)
                console.log('mongo book count returned')
                res.forEach(q => {
                    console.log(q.length)
                })
                console.timeEnd('mongo_gettingBooksByAuthor')
                console.time('neo4j_gettingBooksByAuthor')
                Promise.map(randomAuthors, author => {
                    return neo4j.getBooksByAuthor(author)
                }, {concurrency: 1})
                    .then(res => {
                        // console.log('neo4j res', res)
                        console.log('neo4j book count returned')
                        res.forEach(q => {
                            console.log(q.records.length)
                        })
                        console.timeEnd('neo4j_gettingBooksByAuthor')
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}



const compareGettingCitiesByAuthor = () => {
    return new Promise((resolve, reject) => {
        let randomAuthors = ['Eugene Field', 'Anonymous', 'Lloyd Neil Goble', 'Jean Baptiste Poquelin de Moliere', 'Jan Kochanowski']

        console.time('mongo_gettingCitiesByAuthor')

        Promise.map(randomAuthors, author => {
            return mongoDB.getCitiesByAuthor(author)
        }, {concurrency: 1})
            .then(res => {
                // console.log('mongo res', res.length)
                console.log('mongo book count returned')
                res.forEach(q => {
                    console.log(q.length)
                })
                console.timeEnd('mongo_gettingCitiesByAuthor')
                console.time('neo4j_gettingCitiesByAuthor')
                Promise.map(randomAuthors, author => {
                    return neo4j.getCitiesByAuthor(author)
                }, {concurrency: 1})
                    .then(res => {
                        // console.log('neo4j res', res)
                        console.log('neo4j book count returned')
                        res.forEach(q => {
                            console.log(q.records.length)
                        })
                        console.timeEnd('neo4j_gettingCitiesByAuthor')
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}



const compareGettingBooksByGeoLocation = () => {
    return new Promise((resolve, reject) => {
        let geoLocations = [
            {
                loc: {
                    lat: 55,
                    lon: 12
                },
                radius: 100
            },
            {
                loc: {
                    lat: 40,
                    lon: 20
                },
                radius: 80
            },
            {
                loc: {
                    lat: 80,
                    lon: 0
                },
                radius: 60
            },
            {
                loc: {
                    lat: 0,
                    lon: 0
                },
                radius: 40
            },
            {
                loc: {
                    lat: -72,
                    lon: -122
                },
                radius: 20
            }
        ]

        console.time('mongo_gettingGettingBooksByGeoLocation')

        Promise.map(geoLocations, geo => {
            return mongoDB.getBooksByGeoLocation({lat: geo.loc.lat, lon: geo.loc.lon}, geo.radius)
        }, {concurrency: 1})
            .then(res => {
                // console.log('mongo res', res.length)
                console.log('mongo book count returned')
                res.forEach(q => {
                    console.log(q.length)
                })
                console.timeEnd('mongo_gettingGettingBooksByGeoLocation')
                console.time('neo4j_gettingGettingBooksByGeoLocation')
                Promise.map(geoLocations, geo => {
                    return neo4j.getCitiesinVicinity(geo.loc.lat, geo.loc.lon, geo.radius)
                }, {concurrency: 1})
                    .then(res => {
                        // console.log('neo4j res', res)
                        console.log('neo4j book count returned')
                        res.forEach(q => {
                            console.log(q.records.length)
                        })
                        console.timeEnd('neo4j_gettingGettingBooksByGeoLocation')
                        resolve()
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}


const performTests = () => {
    connect()
        .then(() => {
            compareGettingBooksByCity()
            compareGettingCitiesByBook()
            compareGettingBooksByAuthor()
            compareGettingCitiesByAuthor()
            compareGettingBooksByGeoLocation()


            // TODO: fix beolow code, so promises can run one at a time, doesn't work for some strange reason

            // console.log('Successfully connected to MongoDB, Neo4j is connected')
            // console.log('Initiating tests...')
            // Promise.map(new Array(5), (e, i) => {
            //     switch(i){
            //         case 0:
            //             return compareGettingBooksByCity()
            //         case 1:
            //             return compareGettingCitiesByBook()
            //         case 2:
            //             return compareGettingBooksByAuthor()
            //         case 3:
            //             return compareGettingCitiesByAuthor()
            //         case 4:
            //             return compareGettingBooksByGeoLocation()
            //     }
            // }, {concurrency: 1})
            //     .then(() => {
            //         console.log('All test performed')
            //         console.log('Bye..')
            //         close()
            //         process.exit(0)
            //     })
            //     .catch(err => {
            //         console.log('The followong error occured while performing tests:')
            //         console.log(err)
            //         process.exit(1)
            //     })
        })
        .catch(err => {
            console.log('The followong error occured while connecting to MongoDB:')
            console.log(err)
            console.log('Aborting tests...')
            process.exit(1)
        })
}

performTests()
