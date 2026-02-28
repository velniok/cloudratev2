const express = require('express')
const cors = require('cors')
const router = require('./routes')
const path = require('path')
const errorMiddleware = require('./middlewares/errorMiddleware')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api', router)

app.use(errorMiddleware)

module.exports = app