import dbConnect from "./db/dbConnect.mjs"
import express, { application } from "express"
import bodyParser from "body-parser"
import { config } from "dotenv"
import dotenv from "dotenv"
import userRegister from "./src/auth/register.mjs"
import userLogin from "./src/auth/login.mjs"
import logout from "./src/auth/logout.mjs"
import jwtAuthentification from "./middleware/verifyToken.mjs"
import cookieParser from "cookie-parser";

dotenv.config()

const server = express()
dbConnect()



server.set('view engine', 'ejs')

server.use(bodyParser.urlencoded({extended: true}))

// server.use(jwtAuthentification)
server.use(bodyParser.json())

server.get("/", (req, res) => {
    res.render('welcome')
})

server.get('/register', (req, res) => {
    res.render('auth/register');
  });
server.post('/register', userRegister)


server.get('/login', (req, res) => {
    res.render('auth/login');
  });
server.post('/login', userLogin)

server.use(cookieParser())

server.get('/dashboard', jwtAuthentification, (req, res) => {

  res.render('profil')
})

server.get('/logout', jwtAuthentification, logout)

server.listen(3000, () => {
    console.log(" server is runing")
})