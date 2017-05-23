'use strict'

import * as mongo from '../../mongo'
import cityGetter from './cityGetter'

export default (done) => {

    const dbData = (done) => {
        mongo.connect()
            .then(() => {
                // return done(null, [{_id: 1, name: 'London'}, {_id: 1, name: 'Copenhagen'}, {_id: 1, name: 'she'}])
                console.log('fetching cities from mongo...')
                mongo.get().collection('books').find().toArray((err, docs) => {
                    if (err) console.log(err)
                    console.log('cities fetched')
                    return done(err, docs)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    const books = () => dbData((err, docs) => {
        return done(docs.map(({_id, author, title, mentionedCities}) => (({_id, author, title, mentionedCities}))))
    })


    return cities()

}

findBookByCityName(){
if (cities.contains("Central Park")){
    const cityid = this._id
};
if(books.mentionedCities.contains(_id)){
     return this;
} 
}