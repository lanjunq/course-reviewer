const mongoose = require('mongoose')

const wordCloudSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    words: [ String ],
});

module.exports = mongoose.model('WordCloud', wordCloudSchema);