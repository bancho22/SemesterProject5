'use strict'

const neo4j = require('neo4j-driver').v1;
var pass = 'b.pqO3PhXYg6Br.lRBUez6CRAI6aFQW'
var uri = 'bolt://hobby-egiddfjmojekgbkenabifhpl.dbs.graphenedb.com:24786'
const driver = neo4j.driver(uri, neo4j.auth.basic('admin', pass));
const session = driver.session();

const title = 'Piklioto y dvora';
const authorName = 'Andersen';
const cityName = 'Kapitan Andreeevo';
const location = 'izotzadze';
const resultPromise = session.run(
  'CREATE (a:Book {author: $authorName, title: $title}), (b:City {cityName: $cityName, location: $location  }) CREATE (a)-[:Contains]->(b)  RETURN a,b',
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