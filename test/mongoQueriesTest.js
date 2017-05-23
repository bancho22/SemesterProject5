'use strict'

const chai = require('chai')
const should = chai.should()

const connect = require('../db/mongo').connect
const disconnect = require('../db/mongo').close
const db = require('../db/mongoQueries')('test')


describe('MongoDB queries', () => {

    before((done) => {
        connect()
            .then(() => {
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })

    it('should return all book titles with corresponding authors that mention a city', done => {
        db.getBooksByCity('Sofia')
            .then(books => {
                books.should.be.a('array')
                books.should.have.length(1)
                let book = books[0]
                book.should.be.a('object')
                book.should.have.property('title')
                book.should.have.property('author')
                book.title.should.equal('Audio: After Dinner Toast at Little Menlo')
                book.author.should.equal('Arthur Sullivan')
                done()
            })
            .catch(err => {
                assert.fail(err, 'not an err')
                done()
            })
    })

    it('should return all cities mentioned in a book', done => {
        db.getCitiesByBook('The Tale of Mrs. Tiggy-Winkle')
            .then(cities => {
                cities.should.be.a('array')
                cities.should.have.length(2)
                cities.map(({name, lat, lon}) => {
                    assert(name === 'Dubai' || name === 'Santa Lucía', '')
                    lat.should.be.a('number')
                    lon.should.be.a('number')
                })
                done()
            })
            .catch(err => {
                assert.fail(err, 'not an err')
                done()
            })
    })

    after((done) => {
        disconnect()
            .then(() => {
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })

})
