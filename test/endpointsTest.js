// const chai = require('chai')
// const chaiHttp = require('chai-http')

// chai.use(chaiHttp)
// const should = chai.should()

// describe('REST API Backed by Mongo', () => {

//     it('should respond with the correct schema', done => {
//         chai.request('http://localhost:3000')
//             .get('/api/books/by-city/Sofia')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.body.should.be.a('array')
//                 res.body.forEach(entry => {
//                     entry.should.be.a('object')
//                     entry.should.have.property('author')
//                     entry.should.have.property('title')
//                     entry.author.should.be.a('string')
//                     entry.title.should.be.a('string')
//                 })

//                 done()
//             })
//     })


//     it('should respond with the correct schema', done => {
//         chai.request('http://localhost:3000')
//             .get('/api/books/by-author/Anonymous')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.body.should.be.a('array')
//                 res.body.forEach(entry => {
//                     entry.should.be.a('string')
//                 })

//                 done()
//             })
//     })


//     it('should respond with the correct schema', done => {
//         chai.request('http://localhost:3000')
//             .get('/api/books/by-geo/55/12/100')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.body.should.be.a('array')
//                 res.body.forEach(entry => {
//                     entry.should.be.a('string')                  
//                 })

//                 done()
//             })
//     })

// })
