const http = require('http');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;


async function createServer() {

    await mongoConnect();

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`The server is up and running on Port : ${PORT}`);
    });

}

createServer();