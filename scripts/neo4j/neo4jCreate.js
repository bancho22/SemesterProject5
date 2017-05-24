'use strict'
import cityIdGetter from '../bookScanner/cityGetter'
import mentionedCities from './mentionedArray'
import * as mongo from '../../mongo'
const neo4j = require('neo4j-driver').v1;
var pass = 'b.R3kwHPHBDp1p.1qqD6b2lnXRLeI9I'
var uri = 'bolt://hobby-afpoogmhoeaggbkehihljipl.dbs.graphenedb.com:24786'
const driver = neo4j.driver(uri, neo4j.auth.basic('aim-production', pass));
const session = driver.session();

// const title = 'Porn';
// const authorName = 'bancho';
//  const cityName = 'Keks';
//  const lon = 12.0;
//  const lat = 13.2;

// const location = 'Nas';
// const relation = 'Contains';
//  mongo.connect()
//             .then(() => {
//                // return done(null, [{_id: 1, name: 'London'}, {_id: 1, name: 'Copenhagen'}, {_id: 1, name: 'she'}])
//                 console.log('fetching cities from mongo...')
//                 mongo.get().collection('books').find({_id: id}).toArray((err, docs) => {
//                     if (err) console.log(err)
//                     console.log('books fetched')
//                     return done(err, docs)
//                 })
//             })
//             .catch(err => {
//                 console.log(err)
//             })

let createRel = (title, cityName) => {

    //nameTitleArray.map(({title, citiesMentioned}) =>{
    //console.log(titles + cityName)
    console.log(title + cityName)
    // let titles = title;
    //for(var i = 0; i < citiesMentioned.length;i++){
    //let cityName = name;
    // console.log(citiesMentioned[i])
    return session.run(

        // 'CREATE (b:Book {author: $authorName, title: $title}) RETURN b',

        //'CREATE (c:City {name: $cityName, latitude: $lat, longitude: $lon}) WITH c CALL spatial.addNode("geom",c) YIELD node RETURN node',

        // 'CREATE (c:City {name: $cityName , location $location}) RETURN c',

        'MATCH (b:Book),(c:City)WHERE b.title = $title AND c.name = $cityName CREATE (b)-[r:Contains]->(c)RETURN r',
        { cityName: cityName, title: title }

    )
    //}
}

//}

let getCityName = ((id, title) => {
    return new Promise((resolve, reject) => {
        mongo.get().collection('cities').find({ _id: id }).toArray()
            .then(res => {
                if (!res || !res[0]) return reject('No such city')
                resolve({
                    cityName: res[0].name,
                    title
                })
            })
            .catch(err => {
                reject(err)
                console.log("error")
                process.exit(1)
            })
    })
})
// let sc = () =>{
// console.log(nameTitleArray.citiesMentioned.length)
// }
let nameTitleArray = cityIdGetter(citiesByBook => {
    //console.log(citiesByBook(0))
    // var arr = [];

    let promise2 = []

    citiesByBook.map(({title, citiesMentioned}) => {
        
        citiesMentioned.map(id => {
            promise2.push(getCityName(id, title))
        })
    })
            // .then(res => {

            //     createRel(title, res)


            // })
        //       array = promise2()
        //    let Ids =  citiesByBook(1).map(Id =>{
        //        let returnval = {

        //         title: citiesByBook.title,
        //         name: getCityName(Id)

        //     }
        //     return returnval

        //    })
        //    console.log(Ids.length)
        // 



    
    // .then(result => {

    //     session.close()
    //     driver.close()
    //     console.log('Done')
    //     process.exit(0)
    // })


    Promise.all(promise2)
        .then(result => {
            

            let createRelPromises = result.map(({title, cityName}) => {
                return createRel(title, cityName)
            })

            Promise.all(createRelPromises)
                .then(res => {
                    console.log(res)
                    console.log('Done with adding to Neo4j')
                    session.close()
                    driver.close()
                })
                .catch(err => {
                    console.log('err while adding to Neo4j', err, '\n', err.toString())
                    session.close()
                    driver.close()
                })

            // console.log(result.title)
            // createRel(result)

            
            // console.log('Done')
            // process.exit(0)
        })
        .catch(err => {
            session.close()
            driver.close()
            console.log('Done with error', err)
            process.exit(1)
        })


})



    // let promises = citiesByBook.map(cityID => {
    //     return addBookPromise(cityID)
    // })

    // // console.log(promises[0])



// const addCityPromise = session.run(
//  'CREATE (c:City {name: $cityName, latitude: $lat, longitude: $lon}) WITH c CALL spatial.addNode("geom",c) YIELD node RETURN node',
// { cityName: cityName, lat: lat, lon: lon }

// )
// createRel.then(result => {
//     session.close();

//     // const singleRecord = result.records[0];
//     // const node = singleRecord.get(0);

//     //console.log(node.properties.name);

//     // on application exit:
//     driver.close();
// });