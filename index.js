const express = require('express');

const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000
require('dotenv').config();
const booksRoute = require('./routes/books');
const winston = require('winston');

//moddleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
app.use('/api/books', booksRoute);


// Connect to mongodb atlas.
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}
).then(() => {
    logger.debug("info", "connected to mongoDb atlas")
}).catch(error => {
    logger.error(error);
});


// create a logger
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
             format:winston.format.combine(
                 winston.format.colorize({all:true})
             )
        }),
        new winston.transports.File({filename: "error.log", level:'error'})
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log'})
    ]
});

app.listen(PORT, () => {
    logger.info("Server started at port "+PORT);
})