// const chai = require('chai')
// const chaiHttp = require('chai-http')

// chai.use(chaiHttp)
// const should = chai.should()

// describe('getByCity', () => {

//     it('should list items on GET', done => {
//         chai.request('http://localhost:3000')
//             .get('/api/books/by-city')
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
// })



// describe('getCitiesByBook', () => {

//     it('should list items on GET', done => {
//         chai.request('http://localhost:3000')
//             .get('/api/books/by-bookTitle')
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



// describe('getCitiesByBook', () => {

//     it('should list items on GET', done => {
//         chai.request('http://localhost:3000')
//             .get('/api/books/by-authorName')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.body.should.be.a('array')
//                 res.body.forEach(entry => {
//                     entry.should.be.a('object')
//                     entry.should.have.property('title')
//                     entry.title.should.be.a('string')
//                     entry.should.have.property('citiesMentioned')
//                     entry.citiesMentioned.should.be.a('array')
//                     entry.citiesMentioned.forEach(city => {
//                         city.should.be.a('string')
//                     })
//                 })

//                 done()
//             })
//     })
// })



// describe('getBooksAndCitiesByGeoLocation', () => {

//     it('should list items on GET', done => {
//         chai.request('http://localhost:3000')
//             .get('/api/books/by-geoLocation')
//             .end((err, res) => {
//                 should.equal(err, null)
//                 res.should.have.status(200)
//                 res.body.should.be.a('array')
//                 res.body.forEach(entry => {
//                     entry.should.be.a('object')
//                     entry.should.have.property('title')
//                     entry.title.should.be.a('string')
//                     entry.should.have.property('city')
//                     entry.city.should.be.a('string')
                    
//                 })

//                 done()
//             })
//     })
// })
