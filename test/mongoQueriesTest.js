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
                cities.map(city => {
                    if(!(city.name === 'Dubai' || city.name === 'Santa Lucía')){
                        throw new Error()
                    }
                    city.lat.should.be.a('number')
                    city.lon.should.be.a('number')
                })
                done()
            })
            .catch(err => {
                assert.fail(err, 'not an err')
                done()
            })
    })

    it('should return all books written by an author', done => {
        db.getBooksByAuthor('Beatrix Potter')
            .then(books => {
                books.should.be.a('array')
                books.should.have.length(2)
                books.map(book => {
                    book.should.be.a('string')
                    if(!(book === 'The Story of Miss Moppet' || book === 'The Tale of Mrs. Tiggy-Winkle')){
                        throw new Error()
                    }
                })
                done()
            })
            .catch(err => {
                assert.fail(err, 'not an err')
                done()
            })
    })

    it('should return all cities mentioned in any book written by an author', done => {
        db.getCitiesByAuthor('Beatrix Potter')
            .then(cities => {
                cities.should.be.a('array')
                cities.should.have.length(2)
                cities.map(city => {
                    city.should.be.a('object')
                    if(!(city.name === 'Dubai' || city.name === 'Santa Lucía')){
                        throw new Error()
                    }
                    city.lat.should.be.a('number')
                    city.lon.should.be.a('number')
                })
                done()
            })
            .catch(err => {
                assert.fail(err, 'not an err')
                done()
            })
    })

    it('should return all books mentioning a city in vicinity of the given geolocation', done => {
        db.getBooksByGeoLocation({lat: 25, lon: 55}, 100)
            .then(books => {
                books.should.be.a('array')
                books.should.have.length(2)
                books.map(book => {
                    book.should.be.a('string')
                    if(!(book === 'The Story of Miss Moppet' || book === 'The Tale of Mrs. Tiggy-Winkle')){
                        throw new Error()
                    }
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
