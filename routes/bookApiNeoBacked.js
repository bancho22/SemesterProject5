var express = require('express')
var router = express.Router()

import { 
    getBookByCity,
    getBooksAndCitiesByAuthorOnMap,
    getCitiesByBook,
    getCitiesinVicinity 
} from '../db/neo4jQueries'

const jsonfile = require('jsonfile')
const uuid = require('uuid')
const exec = require('child_process').exec


router.get('/books/by-city/:cityName', (req, res, next) => {
    let cityName = req.params.cityName
    getBookByCity(cityName)
        .then(books => {
            return res.status(200).json(books)
        })
        .catch(err => {
            return res.status(err.includes('No such') ? 404: 500).json(err)
        })
})



router.get('/cities/by-author/:author', (req, res, next) => {
    let author = req.params.author
    getBooksAndCitiesByAuthorOnMap(author)
        .then(cities => {
            let coords = cities.records.map(record => {
                return {
                    lat: record._fields[0].properties.latitude,
                    lon: record._fields[0].properties.longitude
                }
            })
            let imgId = uuid.v1()
            jsonfile.writeFile(`plotting/data/${imgId}.json`, coords, {spaces: 2}, err => {
                if(err){
                    console.log(err)    
                    return res.status(500).json({err: 'We are currently experiencing issues with our services.'})
                }
                let cmd = `python plotting/plot.py ${imgId}`
                exec(cmd, (error, stdout, stderr) => {
                    if (error){
                        console.log(error)
                    }
                })
                let link = `http:localhost:3000/images/${imgId}.png` //TODO: fix domain
                return res.status(202).json({msg: 'Your image will be available soon at: ' + link})
            })
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

    getCitiesinVicinity(lat, lon, radius)
        .then(cities => {
            console.log(cities)
            return res.status(200).json(cities)
        })
        .catch(err => {
            return res.status(err.includes('No such') ? 404: 500).json(err)
        })
})



router.get('/cities/by-book/:bookTitle', (req, res, next) => {
    let bookTitle = req.params.bookTitle
    getCitiesByBook(bookTitle)
        .then(cities => {
            let coords = cities.records.map(record => {
                return {
                    lat: record._fields[0].properties.latitude,
                    lon: record._fields[0].properties.longitude
                }
            })
            let imgId = uuid.v1()
            jsonfile.writeFile(`plotting/data/${imgId}.json`, coords, {spaces: 2}, err => {
                if(err){
                    console.log(err)
                    return res.status(500).json({err: 'We are currently experiencing issues with our services.'})
                }
                let cmd = `python plotting/plot.py ${imgId}`
                exec(cmd, (error, stdout, stderr) => {
                    if (error){
                        console.log(error)
                    }
                })
                let link = `http:localhost:3000/images/${imgId}.png` //TODO: fix domain
                return res.status(202).json({msg: 'Your image will be available soon at: ' + link})
            })
        })
        .catch(err => {
            return res.status(err.includes('No such') ? 404: 500).json(err)
        })
})

module.exports = router
