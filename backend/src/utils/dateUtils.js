function getDays(fromDate, toDate) {
    const days = toDate.getTime() - fromDate.getTime();

    return Math.abs(Math.round(days / (1000 * 3600 * 24)));
}

function getDaysFromNow(date) {
    const now = new Date(Date.now());
    
    return getDays(date, now);
}

function getYearsFromNow(date) {
    const now = new Date(Date.now());
    return Math.ceil(getDays(date, now) / 365);
}

module.exports = {
    getDaysFromNow,
    getYearsFromNow,
    getDays
}