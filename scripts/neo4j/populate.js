'use strict'

import jsonfile from 'jsonfile'


const neo4j = require('neo4j-driver').v1;
var pass = 'b.R3kwHPHBDp1p.1qqD6b2lnXRLeI9I'
var uri = 'bolt://hobby-afpoogmhoeaggbkehihljipl.dbs.graphenedb.com:24786'
const driver = neo4j.driver(uri, neo4j.auth.basic('aim-production', pass));
const session = driver.session();

const books = jsonfile.readFileSync('../data/books.json')
// const cities = jsonfile.readFileSync('../data/cities.json')
const citiesAsObj = jsonfile.readFileSync('../data/citiesAsObj.json') // kinda like a hashmap

const createBookNode = book => {


    return session.run(

        'CREATE (b:Book {author: $authorName, title: $title}) RETURN b',

        //'CREATE (c:City {name: $cityName, latitude: $lat, longitude: $lon}) WITH c CALL spatial.addNode("geom",c) YIELD node RETURN node',

        // 'CREATE (c:City {name: $cityName , location $location}) RETURN c',

        //'MATCH (b:Book),(c:City)WHERE b.title = $title AND c.name = $cityName CREATE (b)-[r:Contains]->(c)RETURN r',
        { authorName: book.author, title: book.title }

    )

}

const createCityNode = city => {

}

const createRelation = (cityName, bookTitle) => {
    
      return session.run(


        'MATCH (b:Book),(c:City)WHERE b.title = $title AND c.name = $cityName CREATE (b)-[r:Contains]->(c)RETURN r',
        { title: bookTitle, cityName: cityName }
      )
}


const addAllBooks = () => {
    return new Promise((resolve, reject) => {
        let createBookNodePromises = books.map(book => {
            // console.log(book.title)
            createBookNode(book)
        })

        Promise.all(createBookNodePromises)
            .then(() => {
                console.log('added all books')
                resolve()

            })
            .catch(err => {
                console.log(err, 'while adding books')
                reject()

            })

    })
}


const addAllRelations = () => {
    return new Promise((resolve, reject) => {
        let createRelationsPromises = []

        books.forEach(book => {
            book.citiesMentioned.forEach(cityId => {
                let cityName = citiesAsObj[cityId]
                //console.log(cityName)
                createRelationsPromises.push(createRelation(cityName, book.title))
            })
        })

        console.log('num of rels', createRelationsPromises.length)

         Promise.all(createRelationsPromises)        
            .then(() => {
                console.log('added all relations')
                resolve()
            })
            .catch(err => {
                console.log(err, 'while adding cities')
                reject()
            })
    })
}



addAllRelations()
    .then(() => {
        session.close()
        driver.close()
    })
    .catch(() => {
        session.close()
        driver.close()
    })
