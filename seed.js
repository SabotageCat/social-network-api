const mongoose = require('mongoose');
const db = require('./models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSeed = [
    {
        
    },
]