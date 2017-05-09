var express = require('express')
var router = express.Router()

// just to make sure the testing framework has been set-up properly
router.get('/by-city', (req, res, next) => {
    let response = [
        {
            author: 'Kolio',
            title: 'Pipi'
        },
        {
            author: 'Kolio1',
            title: 'Dulgoto Chorapche'
        }
    ]
    res.status(200).json(response)
})

module.exports = router
