const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

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
    res.json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const lenBefore = persons.length
    persons = persons.filter(p => p.id !== id)

    if (persons.length === lenBefore) {
        res.status(404).end()
    } else {
        res.status(204).end()
    }
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    if (!person.name) {return res.status(400).json({error: 'Missing field "name"'})}
    if (!person.number) {return res.status(400).json({error: 'Missing field "number"'})}
    if (persons.find(p => p.name === person.name) !== undefined) {
        return res.status(400).json({error: 'Name must be unique'})
    }
    const newId = Math.floor(Math.random() *10000)
    person.id = newId
    persons = persons.concat(person)
    res.json(person)
})



app.listen(PORT, () => console.log(`servu portissa ${PORT}`))
