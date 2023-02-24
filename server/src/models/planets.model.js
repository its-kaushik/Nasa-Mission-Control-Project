const {parse} = require('csv-parse');
const fs = require('fs')
const path = require('path')

const habitablePlanets = []

function isHabitable (planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData () {

    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))

            .on('data', (planet) => {
                if(isHabitable(planet))
                    habitablePlanets.push(planet)
            })

            .on('error', (err) => {
                console.log(`Error while reading planet data stream : ${err}`)
                reject(err)
            })

            .on('end', () => {
                console.log(`${habitablePlanets.length} planets found !!`)
                resolve()
            })
    })
    
}

function getAllPlanets () {
    return habitablePlanets ;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
}