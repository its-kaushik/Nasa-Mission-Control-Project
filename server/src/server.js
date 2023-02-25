const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { loadPlanetsData } = require('./models/planets.model');

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:tTTkDMrrdNNyZgTZ@nasa-project-cluster.zszkq8a.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});

async function createServer() {

    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`The server is up and running on Port : ${PORT}`);
    });

}

createServer();