import express from 'express';
import { getPrice } from '../services/priceService';
const priceapiRouter = express.Router();

// Routes
priceapiRouter.get('/getPrice/:security', async (req, res) => {
    try {
        const { security } = req.params;
        return await getPrice(security);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


export default priceapiRouter;