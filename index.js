const express = require('express');

const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000
require('dotenv').config();

// Connect to mongodb atlas.
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}
).then(() => {
    console.log("connect to mongodb atlas");
}).catch(error => {
    console.log("Something happened", error);
});


app.listen(PORT, () => {
    console.log("Server started at port", PORT);
})