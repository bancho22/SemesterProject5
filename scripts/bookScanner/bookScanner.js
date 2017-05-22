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
    if(!linesInBook[authorLineIndex]) return undefined
    return linesInBook[authorLineIndex].split(' ').reduce((title, word) => {
        const partOfName = word !== 'Author:'
        return title += partOfName ? word + ' ' : ''
    }, '').trim()
}


const bookTitle = (linesInBook) => {
    const titleLineIndex = linesInBook.findIndex(line => line.includes('Title:'))
    if(!linesInBook[titleLineIndex]) return undefined
    return linesInBook[titleLineIndex].split(' ').reduce((title, word) => {
        const partOfTitle = word !== 'Title:'
        return title += partOfTitle ? word + ' ' : ''
    }, '').trim()
}


dir.files('scripts/bookScanner/books', (err, bookFiles) => {
    console.log('bookFiles num', bookFiles.length)

    cityGetter(citiesByNameId => {
        console.log('cities num', citiesByNameId.length)

        let dbEntries = bookFiles.map(fileName => {
            let book = fs.readFileSync(fileName).toString()
            let linesInBook = book.split('\n')
            let wordsInBook = book.replace(/[\n\r]/g, ' ').split(' ')

	        console.log(fileName, 'in processing')

            return {
                author: bookAuthor(linesInBook),
                title: bookTitle(linesInBook),
                citiesMentioned: matchingCitiesInBook(citiesByNameId, book)
            }

            // mongo.get().collection('books').insertOne(dbEntry, (err, r) => {
            //     if(err){
            //         errorsTotal++
            //     }
            //     else{
            //         insertedTotal += r.insertedCount
            //         console.log('book', insertedTotal, 'inserted:', dbEntry.title)
            //     }

            //     if(errorsTotal + insertedTotal === bookFiles.length){
            //         console.log('insertedTotal:', insertedTotal, '\nerrorsTotal', errorsTotal)
            //         console.log('closing mongo connection...')
            //         mongo.close()
            //             .then(() => {
            //                 console.log('Bye...')
            //                 process.exit(0)
            //             })
            //             .catch(err => {
            //                 console.log('Could not close connection', err.toString())
            //                 process.exit(1)
            //             })
            //     }
            // })
        })

	    // dbEntries.forEach(e => {console.log(e.title, 'by', e.author)})

        console.log('dbEntries.length before filter', dbEntries.length)
        dbEntries = dbEntries.filter(({author}, {title}) => {!(!author && !title)}) // to this day cannot understand why (author && title) won't work'
        console.log('dbEntries.length after filter', dbEntries.length, '\n')

        mongo.get().collection('books').insertMany(dbEntries, (err, r) => {
            if(err){
                console.log(err)
                process.exit(1)
            }
            console.log(r)
            process.exit(0)
        })

    })
})
