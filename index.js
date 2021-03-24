import express from 'express';
const app = express();

let phonebook = [
    {
        "id": 1,
        "name": "Kairi Hojo",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Andrew Hojo",
        "number": "555-123456"
    },
    {
        "id": 3,
        "name": "Lin Hojo",
        "number": "666-123456"
    },
]


app.get("/api/persons", (req,res) => {


    res.json(phonebook);
})
app.get("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(p => p.id === id)
    if (!person) {
        return res.status(404).end()
    }
    return res.json(person);
})


app.get("/info", (req,res) => {
    const response = `
<p>The phonebook has ${phonebook.length} people</p>
<p>${new Date().toUTCString()}</p>
    `
    
    res.send(response)
})

app.delete("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(p => p.id !== id)

    res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => console.log(`Server start on ${PORT}`))