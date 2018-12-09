const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL)

const Person = mongoose.model('Person', {
  name: String,
  number: Number
})

const newPerson = (name, number) => {
  const person = new Person({
    name,
    number
  })
  person
    .save()
    .then(result => {
      console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
      mongoose.connection.close()
    })
}

const listPersons = () => {
  console.log('puhelinluettelo:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}

if (process.argv.length===4) {
  name = process.argv[2]
  number = process.argv[3]
  newPerson(name, number)
} else {
  listPersons()
}
