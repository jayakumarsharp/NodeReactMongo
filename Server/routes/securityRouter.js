import express from 'express';
import { securities, createsecurity, updateSecurityById, getSecurityById } from '../services/securityservice';

const securityapiRouter = express.Router();

// Routes
securityapiRouter.get('/securities', async (req, res) => {
    try {
        const security = await securities();
        res.json(security);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

securityapiRouter.post('/security', async (req, res) => {
    try {
        const newsecurity = createsecurity(req.body);
        res.json(newsecurity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

securityapiRouter.put('/security/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedsecurity = updateSecurityById(id, req.body, { new: true });
        res.json(updatedsecurity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

securityapiRouter.delete('/security/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await getSecurityById(id);
        res.json({ msg: 'security deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default securityapiRouter;