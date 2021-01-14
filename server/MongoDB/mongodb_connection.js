// imports
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

mongoose.connection.once('open', () => {
    console.log('Successfully connect to MongoDB Atlas!');
})

// exports
module.exports = mongoose.connection;