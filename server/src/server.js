const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT || 5000, async (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`SERVER OK, PORT = ${process.env.PORT || 5000}`)
})