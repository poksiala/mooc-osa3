const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const Person = mongoose.model('Person', {
    name: String,
    number: Number
})

module.exports = Person