const app = require('../../app.js');
const request = require('supertest');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {

    beforeAll( async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test GET /launches', () => {
        test('It should respond with 200 Success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /launch', () => {

        const completeLaunchData = {
            mission: 'MangalYaan 1011',
            rocket: 'NCC 171-D',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028',
        };

        const launchDataWithoutDate = {
            mission: 'MangalYaan 1011',
            rocket: 'NCC 171-D',
            target: 'Kepler-62 f',

        }

        test('It should respond with 201 Posted', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);

            expect(response.body).toMatchObject(launchDataWithoutDate)

        });
    })

})