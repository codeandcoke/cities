const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('cities', () => {
    describe('GET /cities', () => {
        it('should get all cities', (done) => {
            chai.request(app)
                .get('/cities')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    expect(response.body[0]).to.have.property('name');
                    expect(response.body[0]).to.have.property('altitude');
                    expect(response.body[0]).to.have.property('population');
                    expect(response.body[0]).to.have.property('foundationDate');
                    expect(response.body[0]).to.have.property('age');
                    expect(response.body[0]).to.have.property('area');
                    expect(response.body[0]).to.have.property('density');

                    expect(response.body[0].name).to.equal('Zaragoza');
                    expect(response.body[1].name).to.equal('Madrid');
                    done();
                });
        });
    });

    describe('POST /cities', () => {
        it('should register a new city', (done) => {
            chai.request(app)
                .post('/cities')
                .send({
                    name: 'cityName',
                    population: 100,
                    altitude: 200,
                    foundationDate: '2005-10-10',
                    area: 1000
                })
                .end((error, response) => {
                    response.should.have.status(201);
                    //expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('name');
                    expect(response.body).to.have.property('population');
                    expect(response.body).to.have.property('altitude');
                    expect(response.body).to.have.property('foundationDate');
                    expect(response.body).to.have.property('age');
                    expect(response.body).to.have.property('area');
                    expect(response.body).to.have.property('density');
                    done();
                });
        });

        it('validation should fail because name is mandatory', (done) => {
            chai.request(app)
                .post('/cities')
                .send({
                    population: 100,
                    altitude: 200,
                    foundationDate: '2005-10-10',
                    area: 1000
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('name field is mandatory');
                    done();
                });
        });

        it('validation should fail because population must be greater than 0', (done) => {
            chai.request(app)
                .post('/cities')
                .send({
                    name: "cityName",
                    population: 0,
                    altitude: 200,
                    foundationDate: '2005-10-10',
                    area: 1000
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body.status).to.equal('bad-request');
                    expect(response.body.message).to.equal('population must be greater than 0');
                    done();
                });
        });
    });
});

