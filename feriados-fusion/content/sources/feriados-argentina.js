/* /content/sources/country-find.js */

const resolve = (query) => {

    if (query.hasOwnProperty('year')) return `https://feriados-dev.s3.us-east-2.amazonaws.com/feriados-${query.year}.json`

    throw new Error('feriados endpoint requires year not be null')
}

export default {
    resolve,
    params: {
        year: 'number'
    }
}