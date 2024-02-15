'use strict';

const mongoose = require('mongoose');
const config = require('./config');
const dbURL = config.db.uil;

async function connectToDB() {
    try {

        console.log(dbURL)
        const result = await mongoose.connect(dbURL)

        if (result) {
            return console.log('Database Successfully Connected')
        }
        console.log('Database Not Connected')
    } catch (error) {
        console.log(error)
    }
}


connectToDB();

const db = mongoose.connection;

module.exports = db;