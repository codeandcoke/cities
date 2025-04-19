const httpMocks = require('node-mocks-http');
const { describe, it, expect, afterEach } = require('@jest/globals');

jest.mock('../../service/cities');

const cityController = require('../../controller/cities');

const cityService = require('../../service/cities');
const mockedFindCities = jest.spyOn(cityService, 'findCities');
const mockedRegisterCity = jest.spyOn(cityService, "registerCity");
const { mockCityArray, mockCityToPost, mockCityResponse, mockCityToRegister } = require('./mocks/cities');

afterEach(() => {
    jest.clearAllMocks();
});

describe('cities', () => {
    it('GET /cities should get a city list', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/cities';

        const mockedCityList = jest.fn(async () => {
            return mockCityArray;
        });
        mockedFindCities.mockImplementation(mockedCityList);

        await cityController.getCities(request, response);
        expect(mockedFindCities).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().length).toEqual(5);
    });

    it('POST /cities should register a new city', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/cities';
        request.body = mockCityToRegister;

        const mockedRegisterCityResponse = jest.fn(async () => {
            return mockCityResponse;
        });
        mockedRegisterCity.mockImplementation(mockedRegisterCityResponse);

        await cityController.postCity(request, response);
        expect(mockedRegisterCity).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(201);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().id).toEqual(1);
        expect(response._getJSONData().name).toEqual('Zaragoza');
        expect(response._getJSONData().population).toEqual(700000);
        expect(response._getJSONData().altitude).toEqual(200);
        expect(response._getJSONData().age).toEqual(5);
        expect(response._getJSONData().area).toEqual(734734);
        expect(response._getJSONData().density).toEqual(2373);
        expect(response._getJSONData().foundationDate).toEqual('2020-12-01');
    });
});