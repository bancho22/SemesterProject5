'use strict'

import fs from 'fs'
import dir from 'node-dir'
import cityGetter from './cityGetter'


const matchingCitiesInBook = (cities, book) => {
    console.log('in matchingCitiesInBook()')
    return cities.filter(({name}) => {
        return book.includes(name)
    })
}


const bookAuthor = (wordsInBook) => {
    let authorIndexStart = wordsInBook.findIndex(word => word === 'Author:') + 1
    let authorIndexEnd = wordsInBook.findIndex(word => word === 'Illustrator:')
    return wordsInBook.slice(authorIndexStart, authorIndexEnd).reduce((authorName, partOfName) => {
        return authorName += partOfName + ' '
    }, '').trim()
}


const bookTitle = (wordsInBook) => {
    let titleIndexStart = wordsInBook.findIndex(word => word === 'Title:') + 1
    let titleIndexEnd = wordsInBook.findIndex(word => word === 'Author:')
    return wordsInBook.slice(titleIndexStart, titleIndexEnd).reduce((title, word) => {
        return title += word + ' '
    }, '').trim()
}


dir.files('scripts/bookScanner/books', (err, bookFiles) => {
    console.log('bookFiles num', bookFiles.length)

    cityGetter(citiesByNameId => {
        console.log('cities num', citiesByNameId.length)

        console.time('creating entries')
        let dbEntries = bookFiles.map(fileName => {
            let book = fs.readFileSync(fileName).toString().replace(/[\n\r]/g, ' ')
            let wordsInBook = book.split(' ')

            return {
                author: bookAuthor(wordsInBook),
                title: bookTitle(wordsInBook),
                citiesMentioned: matchingCitiesInBook(citiesByNameId, book)
            }
        })

        console.timeEnd('creating entries')

        dbEntries.forEach(e => console.log(e))
    })
})
