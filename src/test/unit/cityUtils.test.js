const expect = require('chai').expect;
const { getDensity} = require('../../utils/cityUtils');

describe('utils', () => {
    it('getDensity', () => {
        let density = getDensity(100, 20);
        expect(density).equal(5);

        density = getDensity(10, 100);
        expect(density).equal(0.1);
    });
});