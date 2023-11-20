const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config('path:.env');
const data = require('./config/database');
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', product);
app.use('/api/v1', user);


app.listen(PORT, ()=>{
    console.log(`server running on port:${PORT}`);
});