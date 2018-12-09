const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

personSchema.statics.format = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person