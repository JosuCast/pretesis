const express = require('express')
const config = require('./config/global')
const db = require('./config/db')
const cors = require('cors');

const app = express();

db();

app.use(cors());
app.use(express.json());
app.use('/api/comidas', require('./routes/comida'));





app.listen(config.port, ()=>{
    console.log('La API esta corriendo en el puerto 4000')
})
