import mongoose from 'mongoose';

const securitySchema = new mongoose.Schema({
    name: String,
    description: String,
    symbol: String,
    exchange: String,
    currency: String,
    ticker: String
});

const User = mongoose.model('Security', securitySchema);

export default User;