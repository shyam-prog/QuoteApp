const mongoose = require('mongoose')

const Comment = new mongoose.Schema({
    quoteId: {type: String, required: true, unique: true},
    commentData: [{
        // id: {type: String, required: true, unique: true},
        commentText: {type: String},
        creatorId: {type: String},
        creatorName: {type: String},
    }],
})

const model = mongoose.model("CommentList", Comment);

module.exports = model