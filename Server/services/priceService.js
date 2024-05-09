
const yahooFinance = require('yahoo-finance2').default;

async function getPrice(sec) {

    return await yahooFinance.quote(sec);
}

export { getPrice };