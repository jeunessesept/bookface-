import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"
import dotenv from "dotenv"
import userRegister from "./src/auth/register.mjs"
import userLogin from "./src/auth/login.mjs"

dotenv.config()

const server = express()

mongoose.connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true, 
    useUnifiedTopology : true,
})

server.set('view engine', 'ejs')

server.use(bodyParser.urlencoded({extended: true}))

server.use(bodyParser.json())

server.get('/', (req, res) => {
    res.render('index');
  });

server.post('/register', userRegister)

server.post('/login', userLogin)

server.listen(3000, () => {
    console.log(" server is runing")
})