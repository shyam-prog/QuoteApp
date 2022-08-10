const mongoose = require('mongoose')

const Quote = new mongoose.Schema({
    quote: {type: String, required: true},
    creatorName: {type: String, required: true},
    creatorId: {type: String, required: true},
    createdAt: {type: String, required: true}
})

const model = mongoose.model("QuoteList", Quote);

module.exports = model