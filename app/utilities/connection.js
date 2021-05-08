const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const url = "mongodb://localhost:27017/RealtimeDecisions";

let userSchema = require('../models/user');

let connection = {}

connection.getCollection = async () => {
    try {
        let database = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        if (database) {
            return mongoose.model("Users", userSchema);
        } else {
            let err = new Error("Could not connect to the database");
            err.status = 500;
            throw err;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = connection;