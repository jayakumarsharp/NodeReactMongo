const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import { connectDB } from './DBconnection';
import securityapiRouter from './routes/securityRouter';
import priceapiRouter from './routes/priceRouter';
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
// Body Parser Middleware
app.use(bodyParser.json());

app.use('/api', securityapiRouter);
app.use('/api', priceapiRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));