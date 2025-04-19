const expect = require('chai').expect;
const { getDaysFromNow, getDays} = require('../../utils/dateUtils');

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-02-13'));
});

afterAll(() => {
    jest.useRealTimers();
});

describe('dateUtils', () => {
    // TODO Añadir casos de prueba para la función getYearsFromNow
    
    it('getDaysFromNow', () => {
        let days = getDaysFromNow(new Date('2025-02-12'));
        expect(days).equal(1);

        days = getDaysFromNow(new Date('2025-01-13'));
        expect(days).equal(31);
    });

    it('getDays', () => {
        let days = getDays(new Date('2025-01-12'), new Date('2025-01-15'));
        expect(days).equal(3);

        days = getDays(new Date('2025-01-01'), new Date('2024-01-01'));
        expect(days).equal(366);

        days = getDays(new Date('2024-01-01'), new Date('2024-01-01'));
        expect(days).equal(0);
    });
});