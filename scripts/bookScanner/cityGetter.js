'use strict'

import * as mongo from '../../mongo'


export default (done) => {

    const dbData = (done) => {
        mongo.connect()
            .then(() => {
                // return done(null, [{_id: 1, name: 'London'}, {_id: 1, name: 'Copenhagen'}, {_id: 1, name: 'she'}])
                console.log('fetching cities from mongo...')
                mongo.get().collection('cities').find().toArray((err, docs) => {
                    if (err) console.log(err)
                    console.log('cities fetched')
                    return done(err, docs)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    const cities = () => dbData((err, docs) => {
        return done(docs.map(({_id, name}) => (({ _id, name }))))
    })


    return cities()
}
