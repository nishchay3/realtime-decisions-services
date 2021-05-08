const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const authentication_routes = require('./app/routes/authentication.router')

const API_URL = "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(API_URL, authentication_routes);

const PORT = process.env.port || 3000

app.listen(PORT, ()=>{
    console.log("Server is listening on port " + PORT);
})