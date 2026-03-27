const express = require('express')
const cors = require('cors')
const router = require('./routes')
const path = require('path')
const errorMiddleware = require('./middlewares/errorMiddleware')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api', router)

app.use(errorMiddleware)

module.exports = app