const express = require('express');
const app = express();

const indexRouter = require('./routes/indexRouter');

const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);


const PORT = 3000;
app.listen(PORT, (error) => {
    if(error){
        throw error;
    }
    console.log(`My third express app - listening on port ${PORT}! Click http://localhost:3000/ to view.`);
});