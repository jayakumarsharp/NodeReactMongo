// const axios = require('axios');

// // Function to fetch stock prices
// async function getStockPrice(symbol) {
//     try {
//         // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
//         const apiKey = 'RWS8W5Z52IH2R05L';
//         const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${apiKey}`;

//         const response = await axios.get(apiUrl);
//         const data = response.data;

//         // Extracting the price from the response
//         const price = data['Global Quote']['05. price'];

//         return price;
//     } catch (error) {
//         console.error('Error fetching stock price:', error.message);
//         return null;
//     }
// }

// module.exports = {
//     getStockPrice

// };


const express = require('express');
const { connectToDatabase, closeConnection } = require('./DBconnection');
const { getStockPrice } = require('./market');
const axios = require('axios');
const cheerio = require('cheerio');
const axiosRetry = require('axios-retry');
const cors = require('cors');

const https = require('https');
// Enable retries with exponential backoff strategy
//axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });


// Create an instance of Axios with custom HTTPS agent
const agent = new https.Agent({
    rejectUnauthorized: false  // Ignore SSL certificate validation errors
});

async function fetchNSEStockPrice(symbol) {
    try {

        const response = await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/INFY.NS', { httpsAgent: agent });
        const html = response.data;
        const $ = cheerio.load(html);
        // Extracting the last traded price
        const price = $('#responseDiv').find('span#ltpid').text().trim();
        return price;
    } catch (error) {
        console.error("Error fetching NSE stock price:", error);
        throw new Error("Failed to fetch NSE stock price");
    }
}

// Usage example
const symbol = 'INFY'; // Example stock symbol (Infosys)


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/api/stock/:symbol', async (req, res) => {
    try {
        const apiKey = 'RWS8W5Z52IH2R05L'; // Replace with your Alpha Vantage API key
        const symbol = req.params.symbol;
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

app.get('/', async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('example');
    const result = await collection.find({}).toArray();

    getStockPrice(stockSymbol)
        .then(price => {
            if (price) {
                console.log(`Current price of ${stockSymbol}: ${price}`);
            } else {
                console.log(`Unable to fetch price for ${stockSymbol}`);
            }
        })
        .catch(err => console.error(err));
    res.json(result);
});

// Other routes and middleware...

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle application shutdown
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit();
});

app.get('/livePrice', async (req, res) => {
    try {
        fetchNSEStockPrice(symbol)
            .then(price => {
                console.log(`Live price of ${symbol} on NSE: ${price}`);
                const livePriceData = price;
                res.json(livePriceData);
            })
            .catch(error => {
                console.error(error);
            });



    } catch (error) {
        console.error("Error fetching live price data:", error);
        res.status(500).json({ error: "Failed to fetch live price data" });
    }
});

// Example usage
const stockSymbol = 'INFY'; // Example: Infosys


