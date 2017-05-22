'use strict'
//import bookScanner from './bookScanner'
const neo4j = require('neo4j-driver').v1;
var pass = 'b.pqO3PhXYg6Br.lRBUez6CRAI6aFQW'
var uri = 'bolt://hobby-egiddfjmojekgbkenabifhpl.dbs.graphenedb.com:24786'
const driver = neo4j.driver(uri, neo4j.auth.basic('admin', pass));
const session = driver.session();

const title = 'Porn';
const authorName = 'bancho';
const cityName = 'Keks';
const location = 'Nas';
const relation = 'Contains';
const resultPromise = session.run(
  //'CREATE (a:Book {author: $authorName, title: $title}),(b:City {name: $cityName, location: $location  })  RETURN a,b',
  

'MATCH (a:Book),(b:City)WHERE a.title = $title AND b.name = $cityName CREATE (a)-[r:Contains]->(b)RETURN r',
{authorName: authorName, title: title , cityName: cityName, location: location}

);

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  //console.log(node.properties.name);

  // on application exit:
  driver.close();
});