'use strict'

import * as mongo from '../../mongo'


export default (done) => {

    const dbData = (done) => {
        mongo.connect()
            .then(() => {
                mongo.get().collection('cities').find({ name: 'London' }).toArray((err, docs) => {
                    if (err) console.log(err)
                    return done(err, docs)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    const cities = () => dbData((err, docs) => docs.map(({_id, name}) => {
        return done({ _id, name })
    }))


    return cities()
}
