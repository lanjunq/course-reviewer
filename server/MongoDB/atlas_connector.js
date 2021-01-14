const mongoose = require('mongoose')

// get atlas connection password
const env = require('../env.js')
const password = env.mongo_atlas_connection.password

// connect to atlas
const dbName = 'raw_data' // choose which database to connect
const uri = `mongodb+srv://lanjun:${password}@cluster0.wl3i4.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection;

db.once('open', () => {
    console.log('Successfully connect to MongoDB Atlas!');
    // db.db('raw_data').collection('comment')
})

module.exports = db