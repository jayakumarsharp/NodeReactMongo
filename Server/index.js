const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const yahooFinance = require('yahoo-finance2').default;


// Create an instance of the API with your API key
//const yahooFinance = new YahooFinanceAPI('dj0yJmk9TGF1dUlGQWxXS2NHJmQ9WVdrOVF6TnVVRFZEVmtjbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFl');

// Fetch data for a specific stock symbol

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Function to fetch stocks by sector from Yahoo Finance website
const getStocksBySector = async (sector) => {
  try {
    var sec = 'RELIANCE.NS';
    var result = await yahooFinance.quoteSummary(sec);
    console.log(result);

    const quote = await yahooFinance.quote(sec);
    console.log(quote);


    //var queryOptions = { period1: '2021-02-01', /* ... */ };

    // var gqueryOptions = { count: 5, region: 'US', lang: 'en-US' };
    // result = await yahooFinance.dailyGainers(gqueryOptions);
    // console.log(result);

    const queryOptions = { scrIds: 'aggressive_small_caps', count: 5, region: 'US', lang: 'en-US' };

    result = await yahooFinance.screener(queryOptions);
    console.log(result);
    result = await yahooFinance.historical(sec, queryOptions);
    console.log(result);

    result = await yahooFinance.insights(sec);
    console.log(result);



    result = await yahooFinance.fundamentalsTimeSeries(sec);
    console.log(result);

    result = await yahooFinance.recommendationsBySymbol(sec);
    console.log(result);

    result = await yahooFinance.search(sec);
    console.log(result);


    result = await yahooFinance.trendingSymbols(sec);
    console.log(result);

    result = await yahooFinance.dailyGainers(sec);
    console.log(result);

    result = await yahooFinance.quoteCombine(sec);
    console.log(result);
    // const response = await axios.get(`https://finance.yahoo.com/sector/${sector.toLowerCase()}`);
    // const data = cheerio.load(response.data);

    // const stocks = [];
    // $('tr[data-reactid*="TICKER-ROW"]').each((index, element) => {
    //   const symbol = $(element).find('td[data-reactid="10"]').text(); // Adjust the selector based on Yahoo Finance's page structure
    //   if (symbol) {
    //     stocks.push(symbol);
    //   }
    // });

    return result;
  } catch (error) {
    console.error('Error fetching stocks by sector:', error);
    throw error;
  }
};

// Endpoint to fetch sample data
app.get('/api/data', (req, res) => {

  // const sector = 'Technology'; // Change this to the desired sector
  // getStocksBySector(sector)
  //     .then((stocks) => {
  //         console.log(`Stocks in ${sector} sector:`, stocks);
  //         res.json(stocks);
  //     })
  //     .catch((error) => {
  //         console.error('Error:', error);
  //     });

  const sector = 'Technology'; // Change this to the desired sector
  getStocksBySector(sector)
    .then((stocks) => {
      return stocks;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const getAllStocksFromNSE = async () => {
//   try {
//     const response = await axios.get('https://www1.nseindia.com/content/equities/EQUITY_L.csv');
//     const csvData = response.data;
//     const stockNames = parseCSV(csvData);
//     return stockNames;
//   } catch (error) {
//     console.error('Error fetching stock names from NSE:', error);
//     throw error;
//   }
// };

// Function to parse CSV data and extract stock names
const parseCSV = (csvData) => {
  const lines = csvData.split('\n');
  const stockNames = [];

  for (let i = 1; i < lines.length; i++) { // Start from index 1 to skip header line
    const line = lines[i].trim();
    if (line) {
      const parts = line.split(',');
      if (parts.length >= 2) {
        const stockName = parts[1]; // Assuming the stock name is in the second column
        stockNames.push(stockName);
      }
    }
  }

  return stockNames;
};

// // Example usage
// getAllStocksFromNSE()
//   .then((stockNames) => {
//     console.log('Stock Names from NSE:', stockNames);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });