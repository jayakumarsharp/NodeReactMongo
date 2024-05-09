import security from '../model/security';

async function securities() {
    return await security.find();
}

async function createsecurity(security) {
    try {
        const newsecurity = new security(security);
        return await newsecurity.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

async function updateSecurityById(id, newData) {
    try {
        // Find the security by id and update it
        const updatedSecurity = await security.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedSecurity) {
            throw new Error('Security not found');
        }

        return updatedSecurity;
    } catch (error) {
        throw error;
    }
}


async function getSecurityById(userId) {
    try {
        const { id } = req.params;
        return await security.findByIdAndDelete(id);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


export { securities, createsecurity, updateSecurityById, getSecurityById };