const express = require('express')
const app = express()
const cors = require('cors')
var mongoose = require('mongoose')
require('dotenv').config()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
const userRouter = require('./routes/userRoute')
app.use('/u', userRouter)

const patientRouter = require('./routes/patientRoute')
app.use('/patient', patientRouter)

// middleware
const authenticate = require('./middleware/authMiddleware')
app.all('/*/ems', authenticate.ems)
// app.all('/ed/*', authenticate.ed)

const PORT = process.env.PORT
//might have to make global
const MONGO_USERNAME = process.env.MONGO_USERNAME
//might have to make global
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
// const MONGO_DATABASE = process.env.MONGO_DATABASE
const MONGO_DATABASE = 'test'

mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@stroke-router-bpxfz.gcp.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if(!error) {
        console.log('Successfully connected to MongoDB database')
    }
})




app.listen(PORT, () => {
    console.log("Server is running...")
})