const express = require('express');
const cors = require('cors');
const mongodb = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const uri = "mongodb://127.0.0.1:27017/?compressors=snappy&gssapiServiceName=mongodb";
mongodb.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongodb.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully')
});

const sweetsoupRouter = require('./routes/sweetsoup');
const commentRouter = require('./routes/comment')
const orderRouter = require('./routes/order')

app.use('/sweetsoup', sweetsoupRouter);
app.use('/comment',commentRouter)
app.use('/order',orderRouter)

app.listen(port,()=>{
    console.log("server running on port"+port)
});