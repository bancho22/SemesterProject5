var express = require('express')
var router = express.Router()


const mongoDB = require('../db/mongoQueries')()

router.get('/books/by-city/:cityName', (req, res, next) => {
    let cityName = req.params.cityName
    mongoDB.getBooksByCity(cityName)
        .then(books => {
            return res.status(200).json(books)
        })
        .catch(err => {
            return res.status(err.includes('No such') ? 404: 500).json(err)
        })
})


router.get('cities/by-book/:bookTitle', (req, res, next) => {
    let bookTitle = req.params.bookTitle
    mongoDB.getCitiesByBook(bookTitle)
        .then(cities => {
            //TODO: plot on a map
            return res.status(501).json({})
        })
        .catch(err => {
            return res.status(err.includes('No such') ? 404: 500).json(err)
        })
})


router.get('/books/by-author/:author', (req, res, next) => {
    let author = req.params.author
    mongoDB.getBooksByAuthor(author)
        .then(books => {
            return res.status(200).json(books)
        })
        .catch(err => {
            return res.status(err.includes('No such') ? 404: 500).json(err)
        })
})


router.get('/cities/by-author/:author', (req, res, next) => {
    let author = req.params.author
    mongoDB.getCitiesByAuthor(author)
        .then(books => {
            //TODO: plot on a map
            return res.status(501).json({})
        })
        .catch(err => {
            return res.status(err.includes('No such') ? 404: 500).json(err)
        })
})


router.get('/books/by-geo/:lat/:lon/:radius', (req, res, next) => {
    let lat, lon, radius
    try {
        lat = parseFloat(req.params.lat)
        lon = parseFloat(req.params.lon)
        radius = parseFloat(req.params.radius)
    } catch (error) {
        return res.status(400).json({err: '400 Bad Request'})
    }

    mongoDB.getBooksByGeoLocation({lat, lon}, radius)
        .then(books => {
            return res.status(200).json(books)
        })
        .catch(err => {
            return res.status(err.includes('No such') ? 404: 500).json(err)
        })
})

module.exports = router
