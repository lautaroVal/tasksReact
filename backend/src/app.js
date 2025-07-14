const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;

const rutasTasks = require('./routes/tasks')

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json());


app.use('/tasks', rutasTasks);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);   
})