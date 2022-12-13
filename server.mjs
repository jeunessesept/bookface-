import dbConnect from "./db/dbConnect.mjs"
import express from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"
import dotenv from "dotenv"
import userRegister from "./src/auth/register.mjs"
import userLogin from "./src/auth/login.mjs"

dotenv.config()

const server = express()
dbConnect()



server.set('view engine', 'ejs')

server.use(bodyParser.urlencoded({extended: true}))

server.use(bodyParser.json())


server.get('/register', (req, res) => {
    res.render('register');
  });
server.post('/register', userRegister)


server.get('/login', (req, res) => {
    res.render('login');
  });
server.post('/login', userLogin)

server.listen(3000, () => {
    console.log(" server is runing")
})