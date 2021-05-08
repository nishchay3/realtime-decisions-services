const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const API_URL = "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

const PORT = process.env.port || 4201

app.listen(PORT, ()=>{
    console.log("Server is listening on port " + PORT);
})