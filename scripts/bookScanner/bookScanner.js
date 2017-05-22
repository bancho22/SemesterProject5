'use strict'

import fs from 'fs'
import dir from 'node-dir'
import cityGetter from './cityGetter'
import * as mongo from '../../mongo'


const matchingCitiesInBook = (cities, book) => {
    return cities.filter(({name}) => {
        return book.includes(name)
    }).map(({_id}) => _id)
}


const bookAuthor = (linesInBook) => {
    const authorLineIndex = linesInBook.findIndex(line => line.includes('Author:'))
    if (!linesInBook[authorLineIndex]) return undefined
    return linesInBook[authorLineIndex].split(' ').reduce((title, word) => {
        const partOfName = word !== 'Author:'
        return title += partOfName ? word + ' ' : ''
    }, '').trim()
}


const bookTitle = (linesInBook) => {
    const titleLineIndex = linesInBook.findIndex(line => line.includes('Title:'))
    if (!linesInBook[titleLineIndex]) return undefined
    return linesInBook[titleLineIndex].split(' ').reduce((title, word) => {
        const partOfTitle = word !== 'Title:'
        return title += partOfTitle ? word + ' ' : ''
    }, '').trim()
}


dir.files('scripts/bookScanner/books', (err, bookFiles) => {
    console.log('bookFiles num', bookFiles.length)

    cityGetter(citiesByNameId => {
        console.log('cities num', citiesByNameId.length)

        let timesPerBook = []

        let dbEntries = bookFiles.map(fileName => {
            console.log(count++, 'books covered')
            let book = fs.readFileSync(fileName).toString()
            let linesInBook = book.split('\n')
            let wordsInBook = book.replace(/[\n\r]/g, ' ').split(' ')

            let timeStart = new Date().getTime()

            let dbEntry = {
                author: bookAuthor(linesInBook),
                title: bookTitle(linesInBook),
                citiesMentioned: matchingCitiesInBook(citiesByNameId, book)
            }

            let timeEnd = new Date().getTime()
            let timeElapsed = (timeEnd - timeStart) / 1000 //in seconds
            timesPerBook.push(timeElapsed)
            let totalTime = timesPerBook.reduce((total, time) => {
                return total += time
            }, 0)

            console.log('timeElapsed', timeElapsed, 's for', book.length, 'chars')
            console.log('avgPerBook so far', totalTime / timesPerBook.length, 's\n')

            return dbEntry
        })

        console.log('dbEntries.length before filter', dbEntries.length)

        let output = dbEntries.filter(({author}, {title}) => {
            return !(!author && !title) // to this day cannot understand why (author && title) won't work'
        })

        console.log('output.length after filter', output.length, '\n')

        mongo.get().collection('books').insertMany(output, (err, r) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }
            console.log(r)
            process.exit(0)
        })

    })
})
