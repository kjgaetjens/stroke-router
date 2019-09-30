const express = require('express')
const app = express()
const cors = require('cors')
var mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
//might have to make global
const MONGO_USERNAME = process.env.MONGO_USERNAME
//might have to make global
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@stroke-router-bpxfz.gcp.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if(!error) {
        console.log('Successfully connected to MongoDB database')
    }
})

const userRouter = require('./routes/userRoute')
app.use('/u', userRouter)

app.listen(PORT, () => {
    console.log("Server is running...")
})