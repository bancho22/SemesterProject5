'use strict'

import cityGetter from './cityGetter'

console.log('calling cityGetter()')

cityGetter(docs => {
    console.log('outside', docs)
})

