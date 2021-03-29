import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


const app = express();
app.use(cors());


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

app.use(express.static('build'))
app.use(express.json());
morgan.token('content', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
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

app.post("/api/persons", (req,res) => {
    
    const  {name, number} = req.body;
    
    if (!name) return res.status(404).json({'error': "Name field is missing"})
    if (!number) return res.status(404).json({'error': "Number field is missing"})
    const nameExists = phonebook.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (nameExists) return res.status(404).json({'error': "Name already exists"})

    const newPerson = {
        id: Math.floor(Math.random() * 10000000000) + 1,
        name: name,
        number: number
    }

    phonebook = [...phonebook, newPerson]
    res.json(newPerson)
})

app.delete("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(p => p.id !== id)

    res.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server start on ${PORT}`))