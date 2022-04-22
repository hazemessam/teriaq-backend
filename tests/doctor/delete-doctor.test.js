// Third party modules
const supertest = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Application modules
const app = require('../../app');


dotenv.config();
const request = supertest(app);

describe('DELETE /api/doctors/:id', () => {
    beforeEach(async () => await mongoose.connect(process.env.TEST_DB_URI));
    afterEach(async () => {
        await mongoose.connection.db.collection('doctors').deleteMany();
        await mongoose.disconnect();
    });

    const data = {
        email: 'test@dawiny.com',
        password: '1234',
        firstName: 'Hazem',
        lastName: 'Essam'
    }

    it('should respond with 200 status code', async () => {
        let res = await request.post('/api/doctors').send(data);
        const doctorId = res.body._id;
        res = await request.delete(`/api/doctors/${doctorId}`);
        expect(res.status).toBe(200);
    });
    
    it('should return json response', async () => {
        let res = await request.post('/api/doctors').send(data);
        const doctorId = res.body._id;
        res = await request.delete(`/api/doctors/${doctorId}`);
        expect(res.headers['content-type']).toMatch(/json/);
    });
    
    it('should return doctorId', async () => {
        let res = await request.post('/api/doctors').send(data);
        const doctorId = res.body._id;
        res = await request.delete(`/api/doctors/${doctorId}`);
        expect(res.body._id).toEqual(doctorId);
    });
    
    it('should respond with 404 status code if the doctor does not exist', async () => {
        const doctorId = '6260fb7e39818e48bb725388';
        res = await request.delete(`/api/doctors/${doctorId}`);
        expect(res.status).toBe(404);
    });
});
