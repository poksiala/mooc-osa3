const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static('build'))
app.use(bodyparser.json())
app.use(cors())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
      },  
]

app.get('/info', (req, res) => {
    const str = `puhelinluettelossa on ${persons.length} henkilön tiedot`
    const ts = new Date()
    res.send(`<p>${str}</p><p>${ts}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(people => {res.json(people.map(Person.format))})
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(person => {
            if (person) {
                res.status(204).end()
            } else {
                res.status(404).end()
            }
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            res.json(Person.format(person))
        })
        .catch((err) => {
            res.status(404).end()
        })
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name) {return res.status(400).json({error: 'Missing field "name"'})}
    if (!req.body.number) {return res.status(400).json({error: 'Missing field "number"'})}
    
    const person = new Person({...req.body})

    person.save().then(savedPerson => res.json(Person.format(savedPerson)))
})

app.listen(PORT, () => console.log(`servu portissa ${PORT}`))
