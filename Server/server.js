const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import { connectDB } from './DBconnection';
import securityapiRouter from './routes/securityRouter';
import priceapiRouter from './routes/priceRouter';
const socketIo = require('socket.io');
const http = require('http');

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);
let rowData = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 28 }
];

// Function to send updated data to clients
function sendDataToClients() {
    io.emit('updateData', rowData);
}


// Trigger data update every 5 seconds (for demo purposes)
setInterval(() => {
    // Modify rowData as needed
    // For demo, just reverse the order
    rowData = rowData.reverse();
    sendDataToClients();
}, 5000);

connectDB();

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/api', securityapiRouter);
app.use('/api', priceapiRouter);

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});