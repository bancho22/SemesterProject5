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


const bookAuthor = (wordsInBook) => {
    let authorIndexStart = wordsInBook.findIndex(word => word === 'Author:') + 1
    let authorIndexEnd = authorIndexStart + 2
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

let insertedTotal = 0
let errorsTotal = 0

dir.files('scripts/bookScanner/books', (err, bookFiles) => {
    console.log('bookFiles num', bookFiles.length)

    cityGetter(citiesByNameId => {
        console.log('cities num', citiesByNameId.length)

        bookFiles.map(fileName => {
            let book = fs.readFileSync(fileName).toString().replace(/[\n\r]/g, ' ')
            let wordsInBook = book.split(' ')

            let dbEntry = {
                author: bookAuthor(wordsInBook),
                title: bookTitle(wordsInBook),
                citiesMentioned: matchingCitiesInBook(citiesByNameId, book)
            }

            mongo.get().collection('books').insertOne(dbEntry, (err, r) => {
                if(err){
                    errorsTotal++
                }
                else{
                    insertedTotal += r.insertedCount
                    console.log('book', insertedTotal, 'inserted:', dbEntry.title)
                }

                if(errorsTotal + insertedTotal === bookFiles.length){
                    console.log('insertedTotal:', insertedTotal, '\nerrorsTotal', errorsTotal)
                    console.log('closing mongo connection...')
                    mongo.close()
                        .then(() => {
                            console.log('Bye...')
                            process.exit(0)
                        })
                        .catch(err => {
                            console.log('Could not close connection', err.toString())
                            process.exit(1)
                        })
                }
            })
        })
    })
})
