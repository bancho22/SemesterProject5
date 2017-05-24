'use strict'


const neo4j = require('neo4j-driver').v1;
var pass = 'b.R3kwHPHBDp1p.1qqD6b2lnXRLeI9I'
var uri = 'bolt://hobby-afpoogmhoeaggbkehihljipl.dbs.graphenedb.com:24786'
const driver = neo4j.driver(uri, neo4j.auth.basic('aim-production', pass));
const session = driver.session();



export const getBookByCity = cityName => {
    return session.run(
        'MATCH (city:City {name: $name})<-[:Contains]-(book) RETURN book.author, book.title',
        { name: cityName })
}


export const getCitiesByAuthor = author => {
    return session.run(
       'Match (b:Book {author:$name})-[:Contains]->(city) Return city',
       {name: author})
}


export const getBooksByAuthor = author => {
    return session.run(
       'Match (b:Book {author:$name})-[:Contains]->(city) Return city',
       {name: author})
}


export const getCitiesByBook = title => {
    return session.run(
       'Match (b:Book {title:$title})-[:Contains]->(city) Return city',
       {title: title})
}


export const getCitiesinVicinity = (latitude, longitude, radius) => {
    return session.run(
       'CALL spatial.withinDistance($geom,{latitude:&latitude,longitude:$longitude},$radius)',
       {geom: 'geom',latitude: latitude,longitude : longitude , radius: radius})
}
