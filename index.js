import express from 'express';
const app = express();

const phonebook = [
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


const PORT = 3001
app.listen(PORT, () => console.log(`Server start on ${PORT}`))