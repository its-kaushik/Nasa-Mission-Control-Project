const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const server = http.createServer(app) ;
const PORT = process.env.PORT || 4000 ;

async function createServer () {

    await loadPlanetsData()

    server.listen( PORT, () => {
        console.log(`The server is up and running on Port : ${PORT}`) ;
    }) ;    
    
}

createServer()