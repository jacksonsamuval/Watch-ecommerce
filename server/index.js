const express = require('express')
const RunServer = require('./Database/connection')
const userRoutes = require('./Routes/signupRoutes')
const cors = require('cors')

const app = express()
const port = 3000;

app.use(express.json())
app.use(cors())

RunServer()

app.use("/user",userRoutes)

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})