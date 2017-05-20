/**
 * Created by Bancho on 23-Aug-16.
 */

import {MongoClient} from 'mongodb'
let mongoUrl
let mongoUser
let mongoPassword
let connection


function connect(prod) {
    return new Promise((resolve, reject) => {
        if (connection) return resolve();

        mongoUser = 'back-end'
        mongoPassword = 'neverKeepYourPasswordsInPlainTextKids'
        mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@ds013916.mlab.com:13916/sem-project-5`

        // console.log('Connecting to', mongoUrl)

        MongoClient.connect(mongoUrl, (err, mongo) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            console.log('Mongo connected')

            if (!prod) {
                connection = mongo
                return resolve()
            }
        })
    })
}


function get() {
    return connection
}

function close() {
    return new Promise((resolve, reject) => {
        if (connection) {
            connection.close((err, result) => {
                if (err) {
                    return reject(err)
                }
                connection = null
                console.log("conn closed");
                resolve()
            })
        } else {
            reject("conn already closed")
        }
    })
}

module.exports.connect = connect;
module.exports.get = get;
module.exports.close = close;
