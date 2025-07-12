const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const rutasTasks = require('./routes/tasks')

app.use(express.json());


app.use('/tasks', rutasTasks);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);   
})