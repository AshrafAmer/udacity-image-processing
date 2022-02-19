import supertest from 'supertest';
import server from './../../../app';
const request = supertest(server);

describe('Image Processing Controller', () => {
    it('call endpoint with query: [encenadaport, 450*500]', async () => {
        const res = await request.get(
            '/images?filename=encenadaport&width=450&height=500'
        );
        expect(res.statusCode).toBe(200);
    });
});
