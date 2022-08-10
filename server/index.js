const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Quote = require('./models/quotes.model')
const Comment = require('./models/comments.model')
const url = require('url')
const { userInfo } = require('os')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { findOne } = require('./models/quotes.model')
const dotenv = require('dotenv')

const app = express()

dotenv.config()
app.use(cors())

let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let clusterName = process.env.CLUSTERNAME;
let databaseName = process.env.DATABASENAME;
let jwtKey = process.env.JWTSECRETKEY;
let mongoUrl = process.env.MONGOURL;

const mongoDBUrl = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;




// {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }
mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
console.log("")

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello World')
})

app.post('/createPost', async (req, res) => {
    console.log(req.body);
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, jwtKey)
        const email = decoded.email;
        await Quote.create({
            quote: req.body.quoteText,
            creatorName: decoded.name,
            creatorId: email,
            createdAt: req.body.createdAt,
        })

        res.json({ status: 'ok', msg: 'Successfully Uploaded!' })

    } catch (e) {
        res.json({ status: 'error', error: 'Something Went Wrong!' })
    }
})

app.get('/getQuotes', async (req, res) => {
    const quotesArray = await Quote.find({});

    if (quotesArray) {
        // console.log(quotesArray);
        res.json({ status: 'ok', quotes: quotesArray })
    } else {
        res.json({ status: 'error', error: 'Couldnot Fetch Data..' });
    }

})

app.get('/getQuote', async (req, res) => { //comment

    const queryString = url.parse(req.url, true);
    // console.log(queryString.query.quoteId);

    const quote = await Quote.findOne({ _id: queryString.query.quoteId });

    if (quote) {
        // console.log(quotesArray);
        res.json({ status: 'ok', quotes: quote })
    } else {
        res.json({ status: 'error', error: 'Couldnot Fetch Data..' });
    }

})

app.get('/allComments', async (req, res) => {

    const queryString = url.parse(req.url, true);

    const comments = await Comment.find({ quoteId: queryString.query.quoteId });

    if (comments.length != 0) {
        console.log(comments);
        res.json({ status: 'ok', comments: comments[0] })
    } else {
        res.json({ status: 'error', error: 'Couldnot Fetch Data..' });
    }
})

app.post('/comments/addComment', async (req, res) => {
    console.log(req.body)
    const quoteId = req.body.quoteId;
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, jwtKey)
    const email = decoded.email;

    const commentExist = await Comment.findOne({ quoteId: req.body.quoteId });
    const creator = await User.findOne({ email: email });

    console.log(quoteId);

    if (commentExist && creator) {

        console.log("Line No 87");
        const creatorCommented = await Comment.find({ quoteId: quoteId }, { commentData: { $elemMatch: { creatorId: creator._id } } })
        console.log(creatorCommented[0].commentData);
        if (creatorCommented[0].commentData.length > 0) {
            console.log("Line 109")
            res.json({ status: 'error', data: 'Already Commented Once..' })
        } else {
            const comment = await Comment.updateOne({ quoteId: req.body.quoteId }, {
                $push: {
                    commentData: {
                        // id: req.body.quoteId,
                        commentText: req.body.commentText,
                        creatorId: creator._id,
                        creatorName: creator.name,
                    },
                }
            })
            console.log(comment);
            console.log("103");
            res.json({ status: 'ok', commentId: quoteId })
            console.log("Ok working");

        }

    }


    if (!commentExist && creator) {

        console.log("Line 112")

        const comment = await Comment.create({
            quoteId: req.body.quoteId,
            commentData: [{
                // id: req.body.quoteId,
                commentText: req.body.commentText,
                creatorId: creator._id,
                creatorName: creator.name,
            }],
        })
        // console.log("comment")
        console.log("115");
        res.json({ status: 'ok', commentId: quoteId })
    }
})

app.post('/deleteQuote', async (req, res) => {
    const quoteId = req.body.quoteId;
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, jwtKey)
    const email = decoded.email;

    const quote = await Quote.findOne({ _id: quoteId });
    const comment = await Comment.findOne({ quoteId: quoteId });

    if (quote) {
        await Quote.deleteOne({ _id: quoteId });
        if (comment) {
            await Comment.deleteOne({ quoteId: quoteId });
        }
        res.json({ status: 'ok', data: 'Deleted SuccessFully!' });
    } else {
        res.json({ status: 'error', data: `Can't delete this quote!` })
    }

})

app.post('/deleteComment', async (req, res) => {
    const quoteId = req.body.quoteId;
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, jwtKey)
    const email = decoded.email;



    // const quote = await Quote.findOne({_id: quoteId});
    const comment = await Comment.findOne({ quoteId: quoteId });

    if (comment) {
        await Comment.updateOne({ quoteId: quoteId }, {
            $pull: {
                commentData: { creatorName: decoded.name },
            }
        })
        res.json({ status: 'ok', data: 'Deleted SuccessFully!' });
    } else {
        res.json({ status: 'error', data: `Can't delete this quote!` })
    }

})

app.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        const token = jwt.sign({
            name: req.body.name,
            email: req.body.email,
        }, jwtKey, { expiresIn: '1h' })
        res.json({ status: "ok", user: token })
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', error: 'Duplicate Email!' })
    }
})

// app.post('/register', async (req, res) => {
//     const email = req.body.email;
//     const name = req.body.name;

//     let chars = "0123456789!@#$%^&*()abcdefghijklmnopqrstuvwxyz";
//     let pwd_length = 12;
//     let pwd = "";

//     for(var i = 0; i <= pwd_length; i++){
//         var randomNumber = Math.floor(Math.random() * chars.length);
//         pwd += chars.substring(randomNumber, randomNumber + 1);
//     }
//     console.log(pwd);

//     try {
//         const newPassword = await bcrypt.hash(pwd, 10)
//         await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: newPassword,
//         })
//         const token = jwt.sign({
//             name: req.body.name,
//             email: req.body.email,
//         }, jwtKey, { expiresIn: '1h' })
//         res.json({ status: "ok", user: token })
//     } catch (err) {
//         console.log(err);
//         res.json({ status: 'error', error: 'Duplicate Email!' })
//     }
// })

app.post('/login', async (req, res) => {
    // console.log(req.body);
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return res.json({ status: 'error', error: 'username not valid!' })
    }
    const password = await bcrypt.compare(req.body.password, user.password);

    if (password) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, jwtKey, { expiresIn: '1h' })
        res.json({ status: "Ok", user: token })
    } else {
        res.json({ status: "error", error: "Invaild Details" })
    }
})

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log("Server is running on Port 5000..")
})