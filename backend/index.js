const express = require('express')
require('dotenv').config();
const app = express()
const db = require('./models/db')
app.use(express.json())

const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))