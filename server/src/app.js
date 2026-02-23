const express = require('express')
const cors = require('cors')
const router = require('./routes')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api', router)

// app.listen(process.env.PORT || 5000, async (err) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log(`SERVER OK, PORT = ${process.env.PORT || 5000}`)
// })

export default app