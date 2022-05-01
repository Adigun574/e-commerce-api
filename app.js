const express = require("express")
const { json } = require("express/lib/response")
const app = express()
const users = require('./routes/users')
const products = require('./routes/products')
const cors = require('cors');


const connectDB = require('./db/connect.js')
require('dotenv').config()


app.use(cors())

const port = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server listening on port ${port}`)
        })
    } catch (error) {
        console.log('something went wrong')
        console.log(error)
    }
}

startServer()

app.get('/', (req, res) => {
    res.send(`e-commerce endpoint`)
})

app.use(express.json())
app.use('/api/v1/users', users)
app.use('/api/v1/products', products)

